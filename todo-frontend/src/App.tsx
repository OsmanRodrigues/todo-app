import { Test } from '@components/Test';
import * as React from 'react';
import { Col, Container, Row } from 'react-grid-system';

const App: React.FC = (): JSX.Element => {
  return (
    <Container>
      <Row>
        <Col>
          <Test>Test Test My todo App</Test>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
