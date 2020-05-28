import React, {Component} from 'react'
import { connect } from 'react-redux';

class Index extends Component {
    
    componentDidMount() {
        
    }

    render() {
        return (
            <div className="gutter-ats">
               第四个页面范德萨手动阀
               <button>fsaf</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
   
};

const mapDispatchToProps = dispatch => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(Index);
