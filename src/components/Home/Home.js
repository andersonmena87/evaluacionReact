import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import mapa from '../../source/mapaPractica.png'
import { Form, Row, Col, Layout, Input, Button, Switch } from 'antd';

import * as actions from '../../actionCreators';

const { Header, Content } = Layout;
const FormItem = Form.Item;
const styles = {
    content: {
        textAlign: 'center'
    }
}

const StyledHeader = styled.div `
    color: white;
    text-align: center;
    font-size: 20px;
`;

const calculateLatitude = latitude => {
    const grade = parseFloat((latitude / 180) * 523, 10);
    return 261.5 - (grade);
}

const calculateLongitude = longitude => {
    const grade = parseFloat((longitude / 360) * 1006, 10);
    return 512 + (grade);
}

const colorPoint = alture => {
    alture = parseInt(alture, 10);
    let color = "";

    if(alture < 1000) {
        color = "green";
    }else if(alture > 30000){
        color = "red";
    }else{
        color = "yellow";
    }

    return color;
}

const Home = ({ aircrafts, load, loadAircrafts, searchAircrafts}) => {
    return (
        <Layout>
            <Header><StyledHeader>Evaluación</StyledHeader></Header>
            <Content style={styles.content}>
                <Form layout="inline">
                    <Row>
                        <Col>
                            <FormItem>
                                <Input size="small" readOnly placeholder={`En vuelo ${aircrafts.length}`} />
                            </FormItem>
                            <FormItem>
                                <Button loading={load} onClick={() => {loadAircrafts()}}>Actualizar</Button>
                            </FormItem>
                            <FormItem>
                                Tiempo real: <Switch size="small" checked={false} />
                            </FormItem>
                            <FormItem label="Limit show aircrafts">
                                <Input size="small" placeholder="En vuelo 0" defaultValue="1000" />
                            </FormItem>
                            <FormItem label="Country">
                                <Input size="small" onChange={event => searchAircrafts(event, aircrafts)}/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormItem>
                                <div style={{ position: "relative" }}>
                                    <img className="map" src={mapa} />
                                    {
                                        aircrafts.map((aircraft, index) => {
                                           const stylesPoint = {
                                                top: calculateLatitude(aircraft.Lat),
                                                left: calculateLongitude(aircraft.Long),
                                                width: "8px",
                                                height: "8px",
                                                background: colorPoint(aircraft.Alt),
                                                borderRadius: "50%",
                                                position: "absolute"
                                            }
                                            return <div key={`${aircraft.Id + '' + index}`} data-latitud={aircraft.Lat} data-longitud={aircraft.Long} data-altura={aircraft.Alt} style={stylesPoint}></div>
                                            
                                        })}
                                </div>
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
        aircrafts: state.aircrafts,
        load: state.load
    };
}

export default connect(mapStateToProps, actions)(Home);