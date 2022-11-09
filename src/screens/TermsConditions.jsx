// Screen is a component that mediates between
// the API and Fragment to process all business
// logic and incoming requests, manipulate data
// using the API and interact with Fragments to
// provide the final output.

// Import the local dependencies needed.
import './TermsConditions.css'
import spring from '../spring'
import ScreenTitle from '../components/ScreenTitle'
import Breadcrumbs from '../components/Breadcrumbs'

// Import the external dependencies needed.
import React from 'react'
import { useSpring, animated } from 'react-spring'

// Make a Screen by creating functional component.
export default function TermsConditions() {
  // Pass the props needed by the Fragment.
  return (
    <animated.div style={useSpring(spring.fadeIn)}>
      <Breadcrumbs>
        <small>Terms and Conditions</small>
      </Breadcrumbs>
      <animated.div style={useSpring(spring.fromTop)}>
        <ScreenTitle>
          <h1>Terms and Conditions of Q-LiFE UEP MIS</h1>
          <p>
            Listed below are the terms and conditions you must follow when using
            the Q-LiFE UEP MIS.
          </p>
        </ScreenTitle>
      </animated.div>
      <animated.div
        className="terms-conditions-container"
        style={useSpring(spring.delayFadeIn)}>
        <h2>Introduction</h2>
        <h3>
          We know it’s annoying to read the terms and conditions, but it’s
          important to establish what we should expect from each other.
        </h3>
        <p>
          These Terms and Conditions reflects how the DevHaus Technologies
          business works, the laws we follows, and the things we feels right. As
          a result, these Terms and Conditions helps to clarify DevHaus
          Technologies’ relationship with you.
        </p>
        <p>
          Understanding its content is important because, by using our service,
          you agree to what is stated here.
        </p>
        <p>
          In addition to these terms, there are also Privacy Policies that must
          be followed when using the service. These terms are not the same but
          it is also good to read them to better understand how you manage your
          information.
        </p>
        <h3>Service provider</h3>
        <p>
          Q-LiFE UEP MIS services are provided by, and you're contracting with:
        </p>
        <ul>
          <li>DevHaus Software Development Services</li>
          <li>DTI-Registered</li>
          <li>Certificate No: 2584937</li>
        </ul>
        <h2>Your relationship with DevHaus Technologies</h2>
        <p>
          These terms help define the relationship between you and DevHaus
          Technologies. We give you permission to use our services if you agree
          to follow these terms and conditions. When we speak of “DevHaus,”
          “we,” “us,” and “our,” we mean DevHaus Software Development Services.
        </p>
        <h3>What you can expect from us</h3>
        <p>
          Here at Q-LiFE UEP MIS, we provide extensive services in connection
          with these terms. Information management for beneficiaries and their
          farms, dashboard to monitor what needs to be monitored, and a map to
          display plantation locations.
        </p>
        <h3>What we expect from you</h3>
        <p>
          The permission we give you to use this service will remain as long as
          you fulfill your responsibilities. Although we give you permission to
          use our services, we retain any intellectual property rights we have
          in the services.
        </p>
        <p>
          Some of our services are designed to allow you to submit or receive
          content. You have no obligation to provide information and you are
          free to choose the content to be provided or service to be used.
        </p>
        <p>
          The content you create or the information you provide, make sure you
          have the necessary rights to do so and it is in accordance with the
          law.
        </p>
        <p>
          Respect the rights of other users, comply with privacy policy and
          intellectual property rights.
        </p>
        <p>
          Do not abuse or hurt others in ways such as misleading, defrauding,
          defaming, bullying, harassing, or stalking others.
        </p>
        <p>Do not interrupt or disrupt this service.</p>
        <div className="tnc-license">
          <h1>License</h1>
          <p>
            Your content is still yours, meaning you still have intellectual
            property rights in the content you create. For example, you have
            intellectual property rights to the content you create, such as the
            information you enter into the system. You can share it as long as
            the owner gives you permission.
          </p>
          <p>
            We need your permission if your intellectual property rights limit
            our use of your content. You give us permission through this
            license.
          </p>
          <h2>What's covered</h2>
          <p>
            This license covers your content that is protected by intellectual
            property rights.
          </p>
          <h2>What’s not covered</h2>
          <p>
            This license does not affect your privacy rights, only your
            intellectual property rights.
          </p>
          <h2>Scope</h2>
          <p>Worldwide, which means it’s valid anywhere in the world.</p>
          <p>
            Non-exclusive, which means you can license your content to others.
          </p>
          <p>Royalty-free, which means there are no fees for this license.</p>
          <h2>Rights</h2>
          <p>
            This license allows DevHaus to host, reproduce, distribute,
            communicate, and use your content. For example, to save your content
            on our systems and make it accessible from anywhere you go
          </p>
          <p>
            This license allows DevHaus to modify and create derivative works
            based on your content, such as reformatting or translating it.
          </p>
          <p>
            There is strictly no sublicense available to contractors who want to
            capture your data. Meaning, it's up to you if you and the contractor
            will have an agreement. The DevHaus will never mediate and has
            nothing to do with what you and the contractors agrees upon.
          </p>
          <h2>Purpose</h2>
          <p>
            This license is for the limited purpose of operating and improving
            the services, which means allowing the services to work as designed
            and creating new features and functionalities. This includes using
            automated systems and algorithms to analyze your content.
          </p>
          <h2>Duration</h2>
          <p>
            This license lasts for as long as your content is protected by
            intellectual property rights and you use our service.
          </p>
        </div>
        <h2>Using Q-LiFE UEP MIS services</h2>
        <h3>Your Q-LiFE UEP MIS account</h3>
        <p>
          Your system administrator or database controller will create an
          account for you. To use the services, you need an account.
        </p>
        <p>
          You are responsible for your own account, as well as for securing it,
          and we encourage you not to share your password with others.
        </p>
        <h3>Service-related communications</h3>
        <p>
          Sometimes we will provide announcements and other information in your
          email.
        </p>
        <p>
          If you choose to send us feedback, such as suggestions to improve the
          service, we may act on your feedback without obligation to you.
        </p>
        <h2>Content in Q-LiFE UEP MIS services</h2>
        <h3>Your content</h3>
        <p>
          Our service will not give you the opportunity to make public the
          content you create, you can do so outside of our service but you have
          no options if you use our service.
        </p>
        <p>
          If you think someone is violating your intellectual property rights,
          you can report it to our system administrator or anyone with a
          connection to DevHaus. For example, we deactivate the account of the
          user who violates your rights.
        </p>
        <h3>Other content</h3>
        <p>
          Some of our services give you access to content that belongs to other
          people or organizations. An example of this is the tile set used on
          the map, the tile sets are owned by the OpenStreetMap Community.
        </p>
        <h2>In case of problems or disagreements</h2>
        <p>
          Under our law, you have the right to receive quality service, and a
          way to fix the problem if something goes wrong. If you are our
          consumer, this means that all legal rights for you are still
          applicable when you receive our service.
        </p>
        <h3>Warranty</h3>
        <p>
          We provide a service that includes care and is appropriate for you. In
          the event that we fail to fulfill our agreements, you agree to let us
          know and we will work together to resolve the issue.
        </p>
        <h3>Disclaimers</h3>
        <p>
          The information in the service is for the general purpose of the
          system.
        </p>
        <p>
          DevHaus assumes no responsibility for incorrect content or people not
          being granted a user account on the service.
        </p>
        <p>
          DevHaus does not warrant that the service is free of viruses and other
          harmful components.
        </p>
        <h3>Taking action in case of problems</h3>
        <p>
          Before we take action, we will give advance notice when reasonably
          possible, let you know the reason for our action, and give you the
          opportunity to fix the problem. We will do this if it will cause harm
          to another user or Devhaus; violate the law or any legal enforcement;
          compromise an investigation; or compromise the operation, integrity,
          or security of our services.
        </p>
        <h2>About these terms</h2>
        <p>
          By law, you have certain rights that can’t be limited by a contract
          like these terms of service. These terms are in no way intended to
          restrict those rights.
        </p>
        <p>
          These terms describe the relationship between you and DevHaus. They
          don’t create any legal rights for other people or organizations, even
          if others benefit from that relationship under these terms.
        </p>
        <p>
          If it turns out that a particular term is not valid or enforceable,
          this will not affect any other terms.
        </p>
        <p>
          We may update these terms, to reflect changes in our services or how
          we do business.
        </p>
        <p>
          If we change these terms, we’ll provide you with reasonable advance
          notice and the opportunity to review the changes.
        </p>
      </animated.div>
    </animated.div>
  )
}
