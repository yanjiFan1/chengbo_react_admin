/**
 * 富文本编辑器 具体api参考  https://braft.margox.cn/
 * @author yanji
 * date: 2019/10/17
*/

import React from 'react';
import BraftEditor from 'braft-editor';
import { ContentUtils } from 'braft-utils';
import MaxLength from 'braft-extensions/dist/max-length';
import { Upload, Icon, message, Tag } from 'antd';
import { debounce } from 'lodash';
import 'braft-editor/dist/index.css';
import './Index.less';

message.config({
	duration: 2,
	maxCount: 1, // 最多显示个数
});

// 可选字段标签
const entityTags = {
	// 指定扩展类型
	type: 'entity',
	// 指定扩展的entity名称，推荐使用全部大写，内部也会将小写转换为大写
	name: 'KEYWORD-ITEM',
	// 在编辑器工具栏中增加一个控制按钮，点击时会将所选文字转换为该entity
	// control: {
	// 	text: '标签'
	// },
	// 指定entity的mutability属性，可选值为MUTABLE和IMMUTABLE，表明该entity是否可编辑，默认为MUTABLE
	mutability: 'IMMUTABLE',
	// 指定通过上面新增的按钮创建entity时的默认附加数据
	// data: {},
	// 指定entity在编辑器中的渲染组件
	component: (props) => {
		return <span className="keyword-item">{props.children}</span>
	},
	// 指定html转换为editorState时，何种规则的内容将会转换成该entity
	importer: (nodeName, node, source) => {
		// source属性表明输入来源，可能值为create、paste或undefined
		// console.log(node)
		if (nodeName.toLowerCase() === 'span' && node.classList && node.classList.contains('keyword-item')) {
			// 此处可以返回true或者一个包含mutability和data属性的对象
			return {
				mutability: 'IMMUTABLE',
				data: {},
			}
		}
	},
	// 指定输出该entity在输出的html中的呈现方式
	exporter: (entityObject, originalText) => {
		// 注意此处的entityObject并不是一个entity实例，而是一个包含type、mutability和data属性的对象
		return <span className="keyword-item">{originalText}</span>
	}
}

BraftEditor.use([MaxLength({}), entityTags]);

// 可选字段组件
class Keywords extends React.Component {
    render() {
		return (
			<div className="u-keyWords">
				<span>可选字段：</span>
				{(this.props.list || []).map(item => <Tag onClick={()=>this.props.onClick(item.htmlValue)} key={item.id}>{item.fieldName}</Tag>)}
			</div>
		)
	}
}

export default class EditorDemo extends React.Component {
	constructor(props){
		super(props)

		this.onChange = debounce(this.onChange, 200); // 节流阀，节约性能
		this.controls = [ 'font-size', 'separator', 'text-align', 'separator', 'text-color', 'bold', 'italic', 'underline', 'separator', 'link', 'separator'];// 编辑器工具栏
		this.extendControls = [
			{
				key: 'antd-uploader',
				type: 'component',
				component: (
					<Upload
					accept="image/*"
					action="/api/ats/file/upload"
					onChange={this.onUpload}
					showUploadList={false}
					>
						{/* 这里的按钮最好加上type="button"，以避免在表单容器中触发表单提交，用Antd的Button组件则无需如此 */}
						<button type="button" className="control-item button upload-button" data-title="插入图片">
							<Icon type="picture" theme="filled" style={{fontSize: '16px'}} />
						</button>
					</Upload>
				)
			}
		]; // 自定义扩展组件
		this.selfControls = {
			textAligns: ['left', 'center', 'right']
		}
		this.state = {
			editorState: BraftEditor.createEditorState(props.value || null),
			maxLength: props.maxLength || Infinity,// 最大输入长度
			keyWords: [],// 曾选中的可选字段列表
		}
	}

	componentWillReceiveProps(nextProps) {
		if(BraftEditor.createEditorState(nextProps.value) !== this.state.editorState) {
            this.setState({ editorState: BraftEditor.createEditorState(nextProps.value) });
		}
	}

	// 触发编辑器
    onChange = (editorState) => {
		this.setState({ editorState }, () => this.setMaxLength());
	}

	// 图片上传
	onUpload = (info) => {
		if (!info.file) return;

		let { file } = info, { status } = file;

		if (status === 'done') {
            message.success(`${info.file.name} 文件上传成功`);
			file.response && this.setState({
				editorState: ContentUtils.insertMedias(this.state.editorState, [{
					type: 'IMAGE',
					url: file.response.data.url
				}])
			})
        } else if (status === 'error') {
            message.error(`${info.file.name} 文件上传失败`);
		}
	}

	// 字数达到上限的回调
	onReachMaxLength = () => {
        message.warning(`不能超过${this.props.maxLength}字哦~`);
	}

	// 选择可选字段
	onChoseTags = (htmlString, name) => {
		this.setState({
			editorState: ContentUtils.insertHTML(this.state.editorState, htmlString),
		},() => this.setMaxLength())
	}

	// 设置最大长度（可选字段不占用长度）
	setMaxLength = () => {
		const { onChange, list } = this.props;
		const { editorState } = this.state;

		let html = editorState.toHTML(), length = this.props.maxLength || Infinity;
		list.forEach(item => {
			let len = html.split(item.htmlValue).length; // 同个标签选择多次需要计算多个相同标签的长度
			len > 1 && (length += (item.fieldName.length) * (len - 1));
		});

		this.setState({ maxLength: length });
		onChange && onChange(editorState, length);
	}

    render () {
		const { list, className = "", ...rest } = this.props;
        const { editorState, maxLength } = this.state;
        return (
            <div className={`m-braftEditor ${className}`}>
				<BraftEditor
				componentBelowControlBar={list && <Keywords onClick={this.onChoseTags} list={list} />}
				onReachMaxLength={this.onReachMaxLength}
				controls={this.controls}
				extendControls={this.extendControls}
				stripPastedStyles
				{...this.selfControls}
				{...rest}
				maxLength={maxLength}
				value={editorState}
				onChange={this.onChange}
				/>
            </div>
        )
    }
}
