import React, { Component } from 'react'
import {Row, Col, Button, Icon, Input, Select, Tooltip } from 'antd'
import ReactHtmlParser from 'react-html-parser'
import { empty, getYearList, toObjectNull } from '../../utils/index';
import { IvCssTip } from './common.js';
import ApplyPosition from "./ApplyPosition" // 自定义组件
import ApplyBU from "./ApplyBU" // 应聘BU
import AssignBU from "./AssignBU" // 分配BU
import Degree from "./Degree" // 最高学历
import School from "./School" // 学校

const Option = Select.Option;
// 如何使用 search 
// searchItem =[{key:"add",name:'新增', type:'input',c={componet}}]
//<Search search={searchItem} emitFunc/>

// demo：                
//  <Search 
//     search= {[
//       {key:"add", type:'private',name:'新增',c: <Button type="primary">Primary</Button> },
//       {key:"add1", type:'public',name:'新增2'}
//     ]} 
//   />

export default class Search extends Component {
/**
 * @param {any} props 
 * @memberof Search
 */
  constructor(props){
    super(props)

    //等级下拉框
    this.gradeStatic = [{id:15,value:'A+'},{id:12,value:'A'},{id:9,value:'B+'},{id:6,value:'B'},{id:3,value:'F'}]
    this.applyStatus = -1;   //候选人管理页面  tab的状态值 eg:403-面试通过
    this.appixSearch ={
      writtenExamPaperName:null,
      writtenExamPaperScore:null,
    };
    this.state={
      expansion:true,// 是否展开
      uniqueId:0, //重置状态值
    }

    // search key ,基础 key
    this.baseSearch = {
      positionId:null,// 应聘职位id数值型
      buId:null,// 应聘BU
      offerFirstBu:null, //分配BU
      resumeFrom:null, //简历来源
      applicantName:null,// 姓名
      applyId:null,// 应聘ID
      gender:null,// 性别
      phone:null,// 手机号
      schoolId:null,
      degree:null,// 最高学历
      graduationYear:null,// 毕业年份
    }

    // search 类型 private:自定义
    this.baseSearchType = {
      positionId:'private',// 应聘职位
      buId:'private',// 应聘BU
      offerFirstBu:'private', //分配bu
      resumeFrom:'select', //简历来源
      applicantName:'public',// 姓名
      schoolId:'private',
      applyId:'public',// 应聘ID
      gender:'select',// 性别
      phone:'public',// 手机号
      degree:'private',// 最高学历
      graduationYear:'select',// 毕业年份
    }

    // search name
    this.baseSearchName = {
      positionId:'应聘职位',// 应聘职位
      buId:'应聘BU',// 应聘BU
      offerFirstBu:'分配BU', //分配bu
      resumeFrom:'简历来源', //简历来源
      applicantName:'姓名',// 姓名
      applyId:'应聘ID',// 应聘ID
      gender:'性别',// 性别
      phone:'手机号',// 手机号
      schoolId:'学校',
      degree:'最高学历',// 最高学历
      graduationYear:'毕业年份',// 毕业年份
    }

    //search placeholder 
    this.baseSearchPlaceholder = {
      resumeFrom:'请选择简历来源', //简历来源
      applicantName:'请输入姓名',// 姓名
      applyId:'请输入应聘ID',// 应聘ID
      gender:'请输入性别',// 性别
      phone:'请输入手机号',// 手机号
      schoolId:'请输入学校',
      graduationYear:'请输入毕业年份',// 毕业年份
    }

    //search type
    this.baseSearchIptType = {
      applicantName:'text',// 姓名
      applyId:'number',// 应聘ID
      phone:'number',// 手机号
    }

    this.baseSearchComponet = {
      offerFirstBu:<AssignBU getChildComponetValue = {this.getChildComponetValue} />,
      positionId:<ApplyPosition getBaseSearch = {this.getBaseSearch} getChildComponetValue = {this.getChildComponetValue} type={this.props.applyStatus} getApplyStatusForCm={this.getApplyStatusForCm} />,
      buId:<ApplyBU getBaseSearch = {this.getBaseSearch} getChildComponetValue = {this.getChildComponetValue} type={this.props.applyStatus} />,
      degree:<Degree getChildComponetValue = {this.getChildComponetValue} />,
      schoolId:<School getChildComponetValue = {this.getChildComponetValue} />,
    } //当前search 中组件

    //select框的数据
    this.baseSelect = {
        resumeFrom:[{id:-1,value:'全部'},{id:1,value:'校招官网'},{id:2,value:'内部推荐'}],
        gender: [{id:-1,value:'不限'},{id:0,value:'男'},{id:1,value:'女'}],
        graduationYear:getYearList(15,5),
        firstResult:this.gradeStatic,
        complexResult:this.gradeStatic,
        HrResult:this.gradeStatic,
        directorResult:this.gradeStatic,
    }
  }

  componentWillMount(){
    this.creatSearchPannel();
    this.reset()  //初始化
  }

  creatSearchPannel(searchArr,applyStatus){
    this.addSearch={};
    this.addSearchName={};
    this.addSearchType={};
    this.addSearchComponet = {};
    this.addSearchPlaceHolder ={};
    this.addSearchIptType ={};
    this.count = 11;
    let checkAppixSearch = this.checkAppixSearch();
    let arrO = [];
    (searchArr||this.props.search|| []).map( item => {
      this.count++;
      this.addSearch[item.key]=null;
      this.addSearchName[item.key]=item.name;
      this.addSearchType[item.key]=item.type;
      this.addSearchComponet[item.key] =item.c;
      this.addSearchPlaceHolder[item.key] =item.placeholder;
      this.addSearchIptType[item.key] =item.iptType;
      arrO.push(item.key);
    })
    checkAppixSearch.map(items => {
      if(arrO.includes(items)){
          this.addSearch[items] = this.baseSearch[items]
      }else{
          delete this.baseSearch[items] //删除污染属性 
          this.appixSearch[items] = null
      }
    })
    this.handleSearchChange()

    this.search = {...this.baseSearch, ...this.addSearch }
    this.searchName ={ ...this.baseSearchName,...this.addSearchName }
    this.searchType ={ ...this.baseSearchType,...this.addSearchType }
    this.searchComponet ={ ...this.baseSearchComponet,...this.addSearchComponet}
    this.searchPlaceHolder ={ ...this.baseSearchPlaceholder,...this.addSearchPlaceHolder }
    this.searchIptType = { ...this.baseSearchIptType,...this.addSearchIptType }
    this.baseSelectList = { ...this.baseSelect }
  }

  // 检查this.appixSearch中是否有污染属性
  checkAppixSearch = () => {
    let arr = [];
    ['writtenExamPaperName','writtenExamPaperScore','specialId','firstResult','complexResult','HrResult','directorResult'].map((item) => {
        if(this.appixSearch[item]){
          arr.push(item)
        }
    }) 
    return arr;
  }

  // 获取子组件的值
  getChildComponetValue=(key, value)=>{
    this.baseSearch[key] = value;
  }
  /**
   * 操作收起和展开
   */
  evExpansion=(expansion)=>{
    this.setState({
      expansion:!this.state.expansion
    })
  }

  /**
   * 触发 input onchange 方法
   */
  handleChange=(ev,key)=>{
    if(ev.target){
      let value = ev.target.value;
      typeof(value) === "string" ? value = empty(value) : value = value
      this.baseSearch[ev.target.name] = value; 
      // 外来组件进行处理
      ['specialId','writtenExamPaperName','writtenExamPaperScore'].map((item) => {
          if(ev.target.name === item){
            this.appixSearch[ev.target.name] = ev.target.name === 'writtenExamPaperScore' ? (value === '' ? null : Number(value)) : value
          }
          delete this.baseSearch[item]
      }) 
    }else{
      ev = (ev === -1 || ev === '全部') ? null : ev;
      this.baseSearch[key] = ev; 
      // 外来组件进行处理
      ['firstResult','complexResult','HrResult','directorResult'].map(item => {
        if(key === item){
            this.appixSearch[key] =  ev && ev.join(',') || '';
            delete this.baseSearch[item]
        }
      })
    }
  }

  changeSearchPanel(searchArr,applyStatus){
    this.getApplyStatus(applyStatus)
    this.creatSearchPannel(searchArr,applyStatus)
  }
  /*
  *1应聘职位和应聘bu需要各自id（即兄弟通信-父组件过渡
  *2.父组件需要的值 返回baseSearch  
  */
  getBaseSearch = () => {
    return this.handleOutput(this.baseSearch,this.appixSearch)
  }

  /*获取baseSearch和appixSearch的值*/
  getBaseAppix = () => {
    return this.handleOutput(this.baseSearch,this.appixSearch)
  }

  /*获取tab切换的状态值*/
  getApplyStatusForCm = () => {
    return this.applyStatus
  }

  /** 
   * 去搜索
   */
  evSearch =()=>{
    let baseSearch = this.baseSearch;
    this.handleOutput(baseSearch,this.appixSearch);
    // emit other method 其他组件中的方法
    this.props.emitFunc({...baseSearch,...this.appixSearch})
  }

  /*
  *处理搜索项中输出字段的类型或值
  */
  handleOutput = (baseSearch,appixSearch) => {
    //处理毕业年份
    if(baseSearch.graduationYear){
        if(baseSearch.graduationYear.toString().length === 7){
          baseSearch.graduationYear = baseSearch.graduationYear.toString().slice(0,-3) + '-12-31';  //如果为2008以及前  先截取再拼接
          appixSearch.graduationYearBefore = 1;
        }else{
          baseSearch.graduationYear = baseSearch.graduationYear.toString().slice(0,4) + '-12-31';
          appixSearch.graduationYearBefore = 0;
        }
    }
    //处理搜索项用户回退信息的情况
    for(let item in baseSearch){
      baseSearch[item] = (baseSearch[item] === '' || baseSearch[item] === NaN) ? null : baseSearch[item]
    }
    //处理搜索项用户回退信息的情况
    for(let item in appixSearch){
      appixSearch[item] = (appixSearch[item] === '' || appixSearch[item] === NaN) ? null : appixSearch[item]
    }
    // 处理输出为number类型的
    this.baseSearch['applyId'] && ['applyId'].map(item => {
      baseSearch[item] = typeof(baseSearch[item]) === 'string' ? parseInt(baseSearch[item]) : baseSearch[item]
    })
    return {...baseSearch,...appixSearch};
  }

  /*
  *v1.5.1人才池搜素项处理--简历来源显示，应聘id不显示---danger(this.count)
  *v1.5.2候选人管理-面试通过搜素项处理--分配BU显示（特有），应聘id和应聘BU不显示---danger(this.count)
  *params: applyStatus----- talentPool(人才池)   403(候选人管理面试-面试通过)
  */
  handleSearchChange = () => {
    const { applyStatus } = this.props;
    //v1.5.2候选人管理面试-面试通过处理
    if(this.applyStatus === 403){
      delete this.baseSearch['buId'];
      delete this.baseSearch['applyId'];
      if(this.baseSearch.offerFirstBu !== undefined){
        this.baseSearch = {...this.baseSearch}
      }else{
        let baseSearchFor403 = Object.keys(this.baseSearch)
        baseSearchFor403.splice(1,0,'offerFirstBu')
        this.baseSearch = {...toObjectNull(baseSearchFor403,this.baseSearch,['offerFirstBu'])}
      }
      this.count = this.count - 2;
    }else if(applyStatus !== "talentPool"){
      delete this.baseSearch['offerFirstBu'];
      if(this.baseSearch.applyId !== undefined && this.baseSearch.buId !== undefined){
        this.baseSearch = {...this.baseSearch}
      }else{
        let baseSearchForNo403 = Object.keys(this.baseSearch)
        baseSearchForNo403.splice(1,0,'buId')
        baseSearchForNo403.splice(3,0,'applyId')
        this.baseSearch = {...toObjectNull(baseSearchForNo403,this.baseSearch,['buId','applyId'])}
      }
      this.count = this.count - 1;
    }
    //v1.5.1人才池处理(顺序勿动)
    if(applyStatus === 'talentPool'){
      delete this.baseSearch['applyId'];
      delete this.baseSearch['offerFirstBu'];
      this.count = this.count - 2;
    }else{
      delete this.baseSearch['resumeFrom'];
      this.count = this.count - 1;
    }
  }

  //获取tab状态值
  getApplyStatus = (applyStatus) => {
    this.applyStatus = applyStatus;
  }


  /*重置表单-初始化*/
  reset = () => {
    let status = false;
    let status1 = false;
    //重置搜索项数据-防止刷接口
    this.baseSearch.keyUniversity = this.baseSearch.keyUniversity === 1 ? this.baseSearch.keyUniversity : null;
    for(let p in this.baseSearch){
      if(this.baseSearch[p] !== null){
          status = true
      }
    }
    for(let p in this.appixSearch){
      if(this.appixSearch[p] !== null){
         status1 = true
      }
    }
    if( status === true || status1 === true || (this.props.reset && this.props.reset() !== null)){
      this.setState({uniqueId:Math.random()});
      for(let p in this.baseSearch){
        this.baseSearch[p] = null
      }
      for(let p in this.appixSearch){
        this.appixSearch[p] = null
      }
      this.props.resetComponentValue && this.props.resetComponentValue()
    }
    this.baseSearch.keyUniversity = null;
    //重置清掉缓存
    localStorage.removeItem('isChooseId') 
    localStorage.removeItem('isChoosePosition')
    localStorage.removeItem('isChooseBu')
    this.props.reset && this.props.reset()
  }

  render() { 
    const { expansion } = this.state;
    return (
      <div className ="m-search" key={this.state.uniqueId}>
        <Row gutter={16} type="flex" justify="space-between" align="bottom" >
            <Col span={21} className={expansion?"expansion-up":"expansion-down"}>
                <Row gutter={16}>
                    {
                      this.search &&
                      Object.keys(this.search).map(key=>{
                        if(key!=='keyUniversity'){
                          return (
                            <Col span={8} className="search-bar" key={key}>
                                <Row gutter={16}>
                                    <Col span={8} className="f-tar">{this.searchName[key]  === '面试结论' ? <span>面试结论
                                        <Tooltip overlayClassName="m-IvCss-tips" placement="bottom" title={ReactHtmlParser(IvCssTip)}>
                                            <Icon className="f-cp" type="question-circle-o" />
                                        </Tooltip>
                                    </span> : this.searchName[key]} ：</Col>
                                    <Col span={16}>
                                       { this.searchType[key] === 'public' && (this.searchIptType[key] == 'number' ? <Input type="number" ref={key} name={key} placeholder={this.searchPlaceHolder[key]} onChange={this.handleChange} />: <Input ref={key} name={key} placeholder={this.searchPlaceHolder[key]} onChange={this.handleChange} />)}
                                       { this.searchType[key] === 'select' && <Select style={{width:"100%"}}  ref={key} name={key} placeholder={this.searchPlaceHolder[key]} onChange={(e) => this.handleChange(e,`${key}`)}>
                                           {this.baseSelectList[key].map(item => {
                                               return <Option value={`${key}` === 'graduationYear' ||  `${key}` === 'resumeFrom' ? item.value : item.id} key={item.id}>{item.value}</Option>
                                           })}
                                       </Select>}
                                       { this.searchType[key] === 'private' && this.searchComponet[key] }
                                       { this.searchType[key] === 'selectMultiple' && <Select style={{width:"100%"}} mode="multiple"  ref={key} name={key} placeholder={this.searchPlaceHolder[key]} onChange={(e) => this.handleChange(e,`${key}`)}>
                                           {this.baseSelectList[key].map(item => {
                                               return <Option value={item.id} key={item.id}>{item.value}</Option>
                                           })}
                                       </Select>}
                                    </Col>
                                </Row>
                            </Col>
                          )
                        }
                        
                      })
                    }
                </Row>
            </Col>
            <Col span={3} className="f-tar">
              <div><Button type="primary" icon="search" style={{margin:'0 8px 8px 0'}} onClick={this.evSearch}>搜索</Button><span className="u-search-reload f-cp" onClick={this.reset} >清空</span>{/*<Icon  className="u-search-reload" type="reload" onClick={this.reset} />*/}</div>
            </Col>
        </Row>

        <Row className="expansion f-cp f-tac" style={{fontSize:'12px'}}>
          <Col span={24} onClick={this.evExpansion}>{expansion?"展开 ":"收起"} {expansion?<Icon type="down" />:<Icon type="up" />}</Col>
        </Row>
        {
             this.count && (  
                <style>
                {`
                    .expansion-down{
                        height: ${50*Math.ceil(this.count/3)}px;
                    }
                `}
                </style>
            )
        }
      </div>
    )
  }
}
