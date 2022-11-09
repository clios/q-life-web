// Screen is a component that mediates between
// the API and Fragment to process all business
// logic and incoming requests, manipulate data
// using the API and interact with Fragments to
// provide the final output.

// Import the local dependencies needed.
import './PrivacyPolicies.css'
import spring from '../spring'
import ScreenTitle from '../components/ScreenTitle'
import Breadcrumbs from '../components/Breadcrumbs'

// Import the external dependencies needed.
import React from 'react'
import { useSpring, animated } from 'react-spring'

// Make a Screen by creating functional component.
export default function PrivacyPolicies() {
  // Pass the props needed by the Fragment.
  return (
    <animated.div style={useSpring(spring.fadeIn)}>
      <Breadcrumbs>
        <small>Privacy Policies</small>
      </Breadcrumbs>
      <animated.div style={useSpring(spring.fromTop)}>
        <ScreenTitle>
          <h1>Privacy Policies of Q-LiFE UEP MIS</h1>
          <p>
            Listed below are the policies that must be followed in order to
            protect the privacy of the information collected and used by Q-LiFE
            UEP MIS.
          </p>
        </ScreenTitle>
      </animated.div>
      <animated.div
        className="privacy-policies-container"
        style={useSpring(spring.delayFadeIn)}>
        <h2>Introduction</h2>
        <h3>
          As an end user of Q-LiFE UEP MIS, you also agree to entrust us with
          your information. We consider it a big responsibility and you still
          have control over your information
        </h3>
        <p>
          This Privacy Policy is designed to help you understand what and why we
          collect your information. You can also read here how to manage your
          information.
        </p>
        <p>
          This privacy policy is for Q-LiFE UEP MIS only. Any information
          available offline or on another system connected to this Q-LiFE UEP
          MIS is not covered by this policy.
        </p>
        <p>
          You can use Q-LiFE UEP MIS to create and manage your provided
          information.
        </p>
        <h2>Information Q-LiFE UEP MIS collects</h2>
        <h3>
          We want you to know what kind of information we collect as you use
          Q-LiFE UEP MIS service
        </h3>
        <p>
          We collect the information in order to provide better service. From
          simply knowing how many beneficiaries have been entered in the
          database to more complex determining what is the status of crops.
        </p>
        <h3>Things you do or leave to us</h3>
        <p>
          When you create an account using Q-LiFE UEP MIS, you provide us with
          your personal information including your name, email, password, office
          where you work and have a role in the system.{' '}
        </p>
        <p>
          We also take the content you create and put it in the database. This
          includes personal information of your beneficiaries, information
          related to their farm, plantation, harvest, and pest and disease.
        </p>
        <h3>Information we collect as you use our services</h3>
        <p>
          Your beneficiaries' personal information, we take the following: first
          name, last name, region, province, municipal, barangay, and we make
          sure that the information you enter into the system has been obtained
          with privacy consent. You can also choose whether to provide the
          following: middle name, suffix name, birthday and civil status.
        </p>
        <p>
          For farm information, it is up to you if you also provide the address
          of your beneficiary's farm such as region, province, municipal and
          barangay.
        </p>
        <p>
          For plantation information, it is up to you if you also provide; the
          total area of plantation in hectare; total number of seedlings for,
          distributed and survived; total number of seedlings per crop status
          like vegetative, flowering, fruiting and harvesting; and the location
          using northing and easting UTM format. As you create a plantation,
          coffee variety will be robusta by default and the total number of
          mortality of seedlings will be automatically computed by deducting
          survived to distributed number of seedlings.
        </p>
        <p>
          For harvest information, it is up to you if you also provide the total
          kilos harvested as fresh, dry and GCB. When you enter farm
          information, the system will also automatically create a harvest
          record with default value of 0 kilo harvested in fresh, dry, and GCB.
        </p>
        <p>
          For pest and disease information, it is up to you if you also provide
          the total percentage of plantation that has pest and disease of ants,
          aphids, stem borers and others. When you enter plantation information,
          the system will also automatically create a pest and disease record
          with default value of 0 percent of ants, aphids, stem borers and
          others.
        </p>
        <h3>Your activity</h3>
        <p>
          We also obtain the IP address and User Agent of your device when using
          our service. It is for security purposes that if there is a token
          leak, the System Administrator can easily determine which account
          should be denied access to the system. The system deletes your IP and
          UA information when you sign out.
        </p>
        <p>
          We do not collect what information you have changed and entered about
          the beneficiaries.
        </p>
        <h2>Why Q-LiFE UEP MIS collects data</h2>
        <h3>We use data to provide the information you needed</h3>
        <p>
          Providing a dashboard containing total information regarding the
          plantations of the entire Quirino Province. Showing on the map where
          the location of the plantation is. Suggesting beneficiaries in need of
          replantation.
        </p>
        <h3>Develop new features</h3>
        <p>
          Using the data gathered, we can suggest features that you may need.
          Such as adding a column to the table, new aggregation and analysis of
          data that will be displayed in the dashboard.
        </p>
        <h2>Your privacy controls</h2>
        <h3>Ways to review your information</h3>
        <p>
          You can easily review the personal information you have given us. Just
          click your name in the side navigation bar of the system and you will
          see your information stored in our database.
        </p>
        <h3>Updating your information</h3>
        <p>
          You can update your information by clicking the edit button. A form
          will appear with your information and you can change it to your
          liking.
        </p>
        <p>
          If you want to change your role and office information, ask your
          colleague the Database Controller or contact the System Administrator.
        </p>
        <h3>Deactivating your account </h3>
        <p>
          To deactivate your account, only the Database Controller and System
          Administrator can do so.
        </p>
        <h3>Deleting your information</h3>
        <p>
          If you want to permanently delete your information from the system
          database itself, just approach the System Administrator to completely
          lose your data.
        </p>
        <h2>Keeping your information secure</h2>
        <h3>
          We build security into Q-LiFE UEP MIS to protect your information
        </h3>
        <p>
          We take the privacy of your information seriously so we do not enter
          into an agreement with any third party or other organization to see
          your information.
        </p>
        <p>
          We use authentication for Q-LiFE UEP MIS users which requires you to
          sign in first for the system to verify that you have the right to use
          the system.
        </p>
        <p>
          We have also implemented role-based access control to authorize the
          functionalities that each user can perform.
        </p>
        <p>
          Your password in the database is also encrypted so that even if there
          is a breach in the database, your password is still secured.
        </p>
        <p>
          Renewal of SSL certificates are automated to maintain uninterrupted
          service.
        </p>
        <h2>Retaining your information</h2>
        <p>
          We retain the information you provide as beneficiaries along with its
          related data.
        </p>
        <p>
          You can delete the beneficiaries you have created. When you delete a
          beneficiary, the data in the database is actually deleted so that the
          information is definitely lost.
        </p>
        <p>
          The logs of when you signed in and signed out will be retained for
          legal, security and fraud prevention.
        </p>
        <p>
          We also back up data for unexpected missing data. Backup data has an
          expiration so after a certain period of time it will also be lost.
        </p>
        <h2>Compliance</h2>
        <p>
          This privacy policy complies with Republic Act 10173 or better known
          as the Data Privacy Act of 2012. Please notify System Administrators
          if there is a complaint about your data for immediate action.
        </p>
        <h2>About this policy</h2>
        <p>
          This policy is for Q-LiFE UEP MIS only. This does not apply to other
          systems that have their own privacy policy that do not incorporate
          this Privacy Policy.
        </p>
        <p>
          The policies stated here may change as necessary. Your right to your
          data will not be diminished without your own consent. We will notify
          you via email if there is a change to the Privacy Policy.
        </p>
      </animated.div>
    </animated.div>
  )
}
