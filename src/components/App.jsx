import React, { Component } from 'react';
import Section from './Section/Section';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Statistics from './Statistics/Statistics';

class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  handleIncrement = (option) => {
    this.setState(prevState => {
      return {
        [option]: prevState[option] + 1,
      };
    });
  }

  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;
    return good + neutral + bad;
  };

  countPositiveFeedbackPercentage = () => {
    const total = this.countTotalFeedback();
    const { good, neutral } = this.state;
    return total === 0 ? 0 : Math.round(((good + neutral) / total) * 100);
  };

  render() {
    const { good, neutral, bad } = this.state;
    const total = this.countTotalFeedback();
    const positivePercentage = this.countPositiveFeedbackPercentage();

    return (
      <>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={this.state}
            onLeaveFeedback={
              this.handleIncrement
            }
          />
        </Section>
        <Section title="Statistics">
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positivePercentage}
          />
        </Section>
      </>
    );
  }
}

export default App;
