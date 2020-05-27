
module.exports = {
    entry: {
        vendor: [ 
          'react',
		  'react-dom',
		  'react-router-dom',
		  'redux',
		  'react-redux',
		  'antd',
		  'lodash'
		],    // 需要分离的库
        charts: ['echarts-for-react']
    }
};