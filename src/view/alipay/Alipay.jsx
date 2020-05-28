import React, {Component} from 'react'
import { connect } from 'react-redux';

class Index extends Component {
    render() {
        return (
            <div className="gutter-ats">
               小程序页面
               <button>小程序小程序小程序小程序</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
   
};

const mapDispatchToProps = dispatch => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(Index);
