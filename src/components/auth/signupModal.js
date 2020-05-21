import React, { Component } from 'react'
import { Modal, Button, Form, Input } from 'antd'
import {loginUser, signupUser} from '../../store/actions/authAction'
import {connect} from 'react-redux'

class SignUpModal extends Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.signupUser(values)
            }
        });
    };

    render() {
        return (
            <Modal
                visible={this.props.openSignUp}
                title="Sign Up"
                onCancel={this.props.onClose}
                footer={null}
            >
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item  name="username" rules={[{ required: true }]}>
                            <Input
                                // prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                            />
                    </Form.Item>
                    <Form.Item  name="password" rules={[{ required: true }]}>
                            <Input
                                // prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Sign Up
                        </Button>
                        <br/>
                        Or <a href="">login now!</a>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}
export default connect(null, {signupUser})(SignUpModal)