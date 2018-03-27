import React from 'react';
import { connect } from 'react-redux';

import mapa from '../../source/mapaPractica.png'
import { Form, Row, Col, Layout, Input, Button, Switch } from 'antd';

const { Header, Content } = Layout;
const FormItem = Form.Item;
const styles = {
    content: {
        textAlign: 'center'
    },
    header: {
        color: 'white',
        textAlign: 'center',
        fontSize: '20px'
    }, 
    area: {
        backgroundColor: '#FFFFFF'
    }
}

const Home = ({ aircrafts }) => {
    return (
        <Layout>
            <Header style={styles.header}>Evaluación</Header>
            <Content style={styles.content}>
                <Form layout="inline">
                    <Row>
                        <Col>
                            <FormItem>
                                <Input size="small" placeholder="En vuelo 0" />
                            </FormItem>
                            <FormItem>
                                <Button type="primary">Actualizar</Button>
                            </FormItem>
                            <FormItem>
                                Tiempo real: <Switch size="small" checked={false} />
                            </FormItem>
                            <FormItem label="Limit show aircrafts">
                                <Input size="small" placeholder="En vuelo 0" defaultValue="1000" />
                            </FormItem>
                            <FormItem label="Country">
                                <Input size="small" />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormItem>
                                <img src={mapa} usemap="#planetmap" />
                                <map name="planetmap">
                                    <area style={styles.area} shape="rect" coords="6.2530408,-75.56457369999998" alt="Sun" />
                                    <area style={styles.area} shape="circle" coords="90,58,3" alt="Mercury" />
                                    <area style={styles.area} shape="circle" coords="124,58,8" alt="Venus" />
                                </map>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>

            </Content>
        </Layout>
    );
}

const mapStateToProps = state => {
    return {
        aircrafts: state.aircrafts
    };
}

export default connect(mapStateToProps)(Home);