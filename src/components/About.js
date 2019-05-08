import React, { Fragment } from "react";
// import { CSSTransition } from "react-transition-group";

// - local imports
import skills from "./data/skills";

class About extends React.Component {
  state = { centered: true, selectedSkill: null };

  updateDescription = skill => {
    this.setState({
      selectedSkill: skill
    });
  };

  clearDescription = () => {
    this.setState({ selectedSkill: null });
  };

  render() {
    let skillBars = [];
    Object.keys(skills).forEach(skillType => {
      skillBars.push(
        <Fragment key={skillType}>
          {/* skill group */}
          <h3 className="heading-tertiary u-margin-bottom-small">
            {skillType}
          </h3>
          {/* skill bars */}
          {skills[skillType].map(skill => (
            <div
              key={`${skill.name}-${skillType}`}
              className={`about__skills__item about__skills__item--${
                skill.percentage
              }`}
              onMouseEnter={() => this.updateDescription(skill)}
              onMouseLeave={this.clearDescription}
            >
              {skill.name}
            </div>
          ))}
        </Fragment>
      );
    });

    const { selectedSkill } = this.state;

    return (
      <section className="about">
        <div className="about__overview">
          <div className="text-box">
            <h3 className="heading-tertiary u-margin-bottom-small">Profile</h3>
            <p className="paragraph">
              <span className="paragraph__block">
                Hello there!
                <br />I am a full-stack developer based in Toronto, Canada.
              </span>
              Deeply dedicated to mastering my craft, I always strive to build
              exceptional experiences with modern tools and technologies. When
              not writing code, I really enjoy learning new stuff, reading books
              and sketching random things.
            </p>
          </div>
          {selectedSkill && (
            <div className="text-box">
              <h3 className="heading-tertiary u-margin-bottom-small">
                {selectedSkill.name}
              </h3>
              <p className="paragraph">{selectedSkill.description}</p>
            </div>
          )}
        </div>
        <div className="about__skills">{skillBars}</div>
      </section>
    );
  }
}

export default About;
