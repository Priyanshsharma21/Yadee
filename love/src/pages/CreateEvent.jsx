import React from 'react'
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import {Link} from 'react-router-dom'
import Form from '../components/Form/Form'
import { Col, Row } from 'antd';

const CreateEvent = ({setCurrentId,currentId}) => {
  return (
    <Container className="make_me_col">

      <Row>
        <Col xl={12} lg={12} md={24} sm={24} xs={24}>
         <Form currentId={currentId} setCurrentId={setCurrentId}/>
        </Col>
      </Row>

        {/* <Grid item xs={12} sm={12} md={6} lg={6}>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
        </Grid> */}
    </Container>
  )
}

export default CreateEvent