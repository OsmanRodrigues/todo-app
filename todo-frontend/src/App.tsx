import * as React from 'react';
import { H2, HDisplay, Kanban, VerticalSeparator } from '@components';
import { Col, Container, Row } from 'react-grid-system';

const CardList = Array.from({ length: 8 }).map((item, index) => (
  <Kanban.Card key={index + 'card'} />
));

const App: React.FC = (): JSX.Element => {
  return (
    <Container>
      <Row justify="center">
        <Col sm={12}>
          <HDisplay>ToDo App</HDisplay>
        </Col>
      </Row>
      <Kanban.View>
        <Row>
          <Col sm={12} md={6} lg={3}>
            <Kanban.List>
              <H2>New</H2>
              {CardList}
            </Kanban.List>
            <VerticalSeparator />
          </Col>
          <Col sm={12} md={6} lg={3}>
            <Kanban.List>
              <H2>ToDo</H2>
              {CardList}
            </Kanban.List>
            <VerticalSeparator />
          </Col>
          <Col sm={12} md={6} lg={3}>
            <Kanban.List>
              <H2>Doing</H2>
              {CardList}
            </Kanban.List>
            <VerticalSeparator />
          </Col>
          <Col sm={12} md={6} lg={3}>
            <Kanban.List>
              <H2>Done!</H2>
              {CardList}
            </Kanban.List>
          </Col>
        </Row>
      </Kanban.View>
    </Container>
  );
};

export default App;
