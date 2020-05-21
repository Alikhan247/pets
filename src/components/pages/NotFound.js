import React from 'react';
import {withRouter} from 'react-router-dom'
import { Result, Button } from 'antd';


class NotFound extends React.Component {
    constructor() {
        super()
        this.state = {}

    }

    render() {

        return   <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary"><a href="/">Back Home</a></Button>}
        />
    }
}


export default withRouter(NotFound)
