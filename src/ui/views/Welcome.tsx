import React, { useState } from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import WelcomeHeaderImg from 'ui/assets/welcome-header.svg';
import WelcomeStep1 from 'ui/assets/welcome-step-1.svg';
import WelcomeStep2 from 'ui/assets/welcome-step-2.svg';
import WelcomeStep3 from 'ui/assets/welcome-step-3.svg';

const Container = styled.div`
  .step {
    padding: 42px 20px 32px 20px;
  }
  .step-title {
    font-weight: 700;
    font-size: 22px;
    line-height: 24px;
    text-align: center;
    color: #333333;
    margin-bottom: 13px;
  }
  .step-content {
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
    color: #333333;
    margin-bottom: 45px;
  }
  .step-image {
    width: 317px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 67px;
  }
`;

const Welcome = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState<number>(1);

  const renderStep = () => {
    if (step === 1) {
      return (
        <section className="step">
          <img className="w-full" src={WelcomeStep1} alt="" />
          <footer>
            <Button
              type="primary"
              size="large"
              block
              onClick={() => {
                setStep(2);
              }}
            >
              {t('global.next')}
            </Button>
          </footer>
        </section>
      );
    }

    if (step === 2) {
      return (
        <section className="step">
          <img className="w-full" src={WelcomeStep2} alt="" />
          <footer>
            <Button
              type="primary"
              size="large"
              block
              onClick={() => {
                setStep(3);
              }}
            >
              {t('global.next')}
            </Button>
          </footer>
        </section>
      );
    }

    return (
      <section className="step">
        <img className="w-full" src={WelcomeStep3} alt="" />
        <footer>
          <Link to="/no-address" replace>
            <Button type="primary" size="large" block>
              {t('page.welcome.step2.btnText')}
            </Button>
          </Link>
        </footer>
      </section>
    );
  };

  return <Container className="h-full">{renderStep()}</Container>;
};

export default Welcome;
