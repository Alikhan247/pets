import React from 'react';
import {connect} from 'react-redux'

import {Link, withRouter} from 'react-router-dom'

import {Switch, Card} from 'antd';
import {adopt, getPets} from "../../store/actions/petAction";

import {getProfile} from "../../store/actions/profileAction";

import {Row, Col} from "antd";

import "./profile.css"


import {message, Modal, Button} from 'antd';
import {BackTop} from 'antd';
import { Descriptions } from 'antd';

import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

const {Meta} = Card;



class Profile extends React.Component {
    constructor() {
        super()
        this.state = {
            pet: {},
            profile: {}
        }

    }

    showModal = (pet) => {
        // console.log(pet)
        this.setState({
            modalVisible: true,
            pet: pet
        });
    };


    handleOk = pet => e => {
        console.log(pet);
        this.props.adopt(pet)
        message.success('Successfully adopted a pet');
        this.setState({
            modalVisible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            modalVisible: false,
        });
    };

    onChange = checked => {
        this.setState({loading: !checked});
    };

    componentDidMount() {
        const name = localStorage.getItem("username")
        console.log(name)
        this.props.getProfile(name);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log("Hello", nextProps)
        if (nextProps.auth.isAuthenticated) {
            this.setState({openLogIn: false, openSignUp: false})
        }
        if (nextProps.profile.length > 0) {
            this.setState({profile: nextProps.profile})
        }
    }


    render() {
        const {loading} = this.state;

        const isAuth = this.props.auth.isAuthenticated;
        const pets = this.props.profile.profile.pets;
        const profile = this.props.profile.profile;

        let nav = ""
        let userPets = ""
        if (isAuth) {
            nav =  <Descriptions title="User Info">
                    <Descriptions.Item label="UserName">{profile.name}</Descriptions.Item>
                    <Descriptions.Item label="Telephone">{profile.id}</Descriptions.Item>
                    <Descriptions.Item label="Status">{profile.role}</Descriptions.Item>
                    <Descriptions.Item label="Username">{profile.username}</Descriptions.Item>
                </Descriptions>

            if (pets && pets.map){
                userPets = pets.map(pet => (
                    <Col span={6} key={pet.id} onClick={() => this.showModal(pet)}>
                        <Card loading={loading}
                              hoverable
                              style={{width: 240}}
                              cover={<img alt="example"
                                          src={pet.img != null ? pet.img : "https://image.flaticon.com/icons/svg/91/91533.svg"}/>}
                        >
                            <Meta title={pet.breed} description={pet.gender == 1 ? "Male" : "Female"}/>
                        </Card>
                    </Col>
                ))
            }
        }

        return <div className="main-profile">
            <Menu
                onClick={this.handleClick}
                style={{ width: 256 }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
            >
                <SubMenu
                    key="sub1"
                    title={
                        <span>
              <MailOutlined />
              <span>Profile</span>
            </span>
                    }
                >
                    <Menu.ItemGroup key="g1" title="General">
                        <Menu.Item key="1">My info</Menu.Item>
                        <Menu.Item key="2">Pets</Menu.Item>
                    </Menu.ItemGroup>
                    <Menu.ItemGroup key="g2" title="Specific">
                        <Menu.Item key="3">Update profile</Menu.Item>
                        <Menu.Item key="4">Manage profile</Menu.Item>
                    </Menu.ItemGroup>
                </SubMenu>
            </Menu>
            <div>
                {nav}
                {userPets}
            </div>
        </div>
    }
}
//
const mapStateToProps = (state) => ({
    auth: state.auth,
    pets: state.pets,
    profile: state.profile
})


export default connect(mapStateToProps, {getProfile ,getPets, adopt})(withRouter(Profile))
