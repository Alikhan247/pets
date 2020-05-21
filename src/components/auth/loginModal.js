import React, {Component} from 'react'
import {Modal, Button, Form, Input} from 'antd'
import axios from 'axios'
import {loginUser} from '../../store/actions/authAction'

import {connect} from 'react-redux'

class LogInModal extends Component {

    handleSubmit = values => {
        this.props.loginUser(values)
        console.log(values)

    };

    render() {
        return (
            <Modal
                visible={this.props.openLogIn}
                title="Login"
                onCancel={this.props.onClose}
                footer={null}
            >
                <Form onFinish={this.handleSubmit} className="login-form">
                    <Form.Item name="username" rules={[{required: true}]}>
                        <Input
                            // prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            placeholder="Username"
                        />
                    </Form.Item>
                    <Form.Item name="password" rules={[{required: true}]}>
                        <Input
                            // prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Login
                        </Button>
                        <br/>
                        {/*Or <a href="">register now!</a>*/}
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default connect(null, {loginUser})(LogInModal)