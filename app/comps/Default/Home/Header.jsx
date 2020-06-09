import React from 'react';
import { Row, Col, Tooltip } from 'antd';
import { header } from './data';
import Link from 'next/link'


export default function Header(props) {
  const menuChild = header.map((item, i) => {
    return (
      <Col key={i.toString()} span={12}>
        <Link
        key={item.title}
        href={{
          pathname: item.link,
          query: {},
          shallow: true
        }}
        passHref
      >
        <span className="nav-title">{item.title}</span>
      </Link>
          
      </Col>
    );
  });
  return (
    <header {...props}>
      <Row className="nav">
        {menuChild}
      </Row>
    </header>
  );
}
