import React from 'react';
import {connect} from 'react-redux'

import {Link, withRouter} from 'react-router-dom'

import {Switch, Card} from 'antd';
import {adopt, getPets} from "../../store/actions/petAction";

import {Row, Col} from "antd";

import './mian.css'

import {message, Modal, Button} from 'antd';
import {BackTop} from 'antd';

const {Meta} = Card;

class PetMain extends React.Component {
    constructor() {
        super()
        this.state = {
            pet: {}
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
        this.props.getPets();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log("Hello", nextProps)
        if (nextProps.auth.isAuthenticated) {
            this.setState({openLogIn: false, openSignUp: false})
        }
        if (nextProps.pets.length > 0) {
            this.setState({pets: nextProps.pets})
        }
    }


    render() {
        const {loading} = this.state;

        const isAuth = this.props.auth.isAuthenticated;
        const pets = this.props.pets.pets;
        console.log(pets)
        let nav = ""
        if (isAuth) {
            nav = pets.map(pet => (
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

        return <div className="main">
            <Row gutter={16} justify="start">
                {/*<Switch checked={!loading} onChange={this.onChange} />*/}
                {nav}
                <Modal
                    title="Basic Modal"
                    visible={this.state.modalVisible}
                    // onOk={}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            Cancle
                        </Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={this.handleOk(
                            {
                                user_name:  localStorage.getItem("username"),
                                pet_id: this.state.pet.id
                            }
                        )}>
                            Adopt
                        </Button>,
                    ]}
                >
                    <Col justify={"center"}>
                        <h1>Name: {this.state.pet.name}</h1>
                        <h3>Breed: {this.state.pet.breed}</h3>
                        <h3>Height: {this.state.pet.height}</h3>
                        <h3>Weight: {this.state.pet.weight}</h3>
                        <h3>Gender: {this.state.pet.gender == 1 ? "Male" : "Female"}</h3>
                    </Col>
                </Modal>
                <BackTop/>
            </Row>

        </div>
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    pets: state.pets
})


export default connect(mapStateToProps, {getPets, adopt})(withRouter(PetMain))
