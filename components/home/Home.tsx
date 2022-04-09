import React from "react";
import styled from "styled-components";
import Link from "next/link";

import CardSection from "../common/CardSection";
import { list } from "../../lib/data/portfolio";

const Container = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;

  .card-wrapper {
    display: flex;
    flex-direction: column;

    max-width: 1440px;
    margin: 0 auto;

    .title {
      font-size: 2.5rem;
      font-weight: bold;
      margin-left: 1rem;
      margin-bottom: 1rem;
      color: #222222;
    }

    .card-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex-wrap: wrap;

      @media screen and (min-width: 800px) {
        flex-direction: row;
      }
    }
  }
`;

const Home: React.FC = () => {
  return (
    <Container>
      <div className="card-wrapper">
        <h1 className="title">🖥 Project</h1>
        <div className="card-section">
          {list.map((item) => (
            <Link href={{ pathname: item.path }} key={item.id}>
              <a target={item.target}>
                <CardSection
                  title={item.title}
                  summary={item.summary}
                  tags={item.tags}
                />
              </a>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Home;
