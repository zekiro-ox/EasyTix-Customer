import React from "react";
import Modal from "react-modal";

const PrivacyPolicyModal = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      appElement={document.getElementById("root")}
      contentLabel="Privacy Policy"
      className="modal"
      overlayClassName="overlay"
    >
      <style>
        {`
          .modal {
            max-height: 80vh; /* Limit the height */
            overflow-y: auto; /* Enable vertical scrolling */
            background: white;
            padding: 20px;
            border-radius: 8px;
            position: relative; /* Ensure it is positioned correctly */
          }
          .overlay {
            background: rgba(0, 0, 0, 0.75); /* Semi-transparent background */
            display: flex; /* Center the modal */
            justify-content: center;
            align-items: center;
          }
          .close-modal {
            background-color: #f44336; /* Red background */
            color: white; /* White text */
            border: none;
            padding: 10px 15px;
            border-radius: 5px;
            cursor: pointer;
            position: absolute; /* Position it in the top right corner */
            top: 10px;
            right: 10px;
            font-size: 16px;
          }
        `}
      </style>
      <button onClick={onRequestClose} className="close-modal">
        Close
      </button>
      <h1 data-custom-class="title">PRIVACY POLICY</h1>
      <p>Last updated November 11, 2024</p>
      <p>
        This Privacy Notice for <strong>EasyTix</strong> ("we," "us," or "our")
        describes how and why we might access, collect, store, use, and/or share
        ("process") your personal information when you use our services
        ("Services"), including when you:
      </p>
      <ul>
        <li>
          Visit our website at{" "}
          <a
            className="link"
            href="https://easy-tix-customer.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            easy-tix-customer.vercel.app
          </a>{" "}
          or any website of ours that links to this Privacy Notice.
        </li>
        <li>
          Use <strong>EasyTix</strong>.{" "}
          <strong>Ticket Selling for School Event</strong>.
        </li>
        <li>
          Engage with us in other related ways, including any sales, marketing,
          or events.
        </li>
      </ul>
      <p>
        <strong>Questions or concerns?</strong> Reading this Privacy Notice will
        help you understand your privacy rights and choices. If you do not agree
        with our policies and practices, please do not use our Services. If you
        still have any questions or concerns, please contact us at{" "}
        <a className="link" href="mailto:rendellebertes24@gmail.com">
          rendellebertes24@gmail.com
        </a>
        .
      </p>
      <h2 data-custom-class="heading_1">SUMMARY OF KEY POINTS</h2>
      <p>
        This summary provides key points from our Privacy Notice, but you can
        find out more details about any of these topics by clicking the link
        following each key point or by using our{" "}
        <a className="link" href="#toc">
          table of contents
        </a>{" "}
        below to find the section you are looking for.
      </p>
      <ul>
        <li>
          <strong>What personal information do we process?</strong> Learn more
          about{" "}
          <a className="link" href="#personalinfo">
            personal information you disclose to us
          </a>
          .
        </li>
        <li>
          <strong>Do we process any sensitive personal information?</strong>{" "}
          Learn more about{" "}
          <a className="link" href="#sensitiveinfo">
            sensitive information we process
          </a>
          .
        </li>
        <li>
          <strong>Do we collect any information from third parties?</strong> We
          do not collect any information from third parties.
        </li>
        <li>
          <strong>How do we process your information?</strong> Learn more about{" "}
          <a className="link" href="#infouse">
            how we process your information
          </a>
          .
        </li>
        <li>
          <strong>
            In what situations and with which parties do we share personal
            information?
          </strong>{" "}
          Learn more about{" "}
          <a className="link" href="#whoshare">
            when and with whom we share your personal information
          </a>
          .
        </li>
        <li>
          <strong>How do we keep your information safe?</strong> Learn more
          about{" "}
          <a className="link" href="#infosafe">
            how we keep your information safe
          </a>
          .
        </li>
        <li>
          <strong>What are your rights?</strong> Learn more about{" "}
          <a className="link" href="#privacyrights">
            your privacy rights
          </a>
          .
        </li>
        <li>
          <strong>How do you exercise your rights?</strong> Learn more about{" "}
          <a className="link" href="#exerciseRights">
            how to exercise your rights
          </a>
          .
        </li>
      </ul>
      <h2 data-custom-class="heading_1">TABLE OF CONTENTS</h2>
      <ul>
        <li>
          <a className="link" href="#infocollect">
            1. WHAT INFORMATION DO WE COLLECT?
          </a>
        </li>
        <li>
          <a className="link" href="#infouse">
            2. HOW DO WE PROCESS YOUR INFORMATION?
          </a>
        </li>
        <li>
          <a className="link" href="#whoshare">
            3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
          </a>
        </li>
        <li>
          <a className="link" href="#cookies">
            4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
          </a>
        </li>
        <li>
          <a className="link" href="#inforetain">
            5. HOW LONG DO WE KEEP YOUR INFORMATION?
          </a>
        </li>
        <li>
          <a className="link" href="#infosafe">
            6. HOW DO WE KEEP YOUR INFORMATION SAFE?
          </a>
        </li>
        <li>
          <a className="link" href="#infominors">
            7. DO WE COLLECT INFORMATION FROM MINORS?
          </a>
        </li>
        <li>
          <a className="link" href="#privacyrights">
            8. WHAT ARE YOUR PRIVACY RIGHTS?
          </a>
        </li>
        <li>
          <a className="link" href="#DNT">
            9. CONTROLS FOR DO-NOT-TRACK FEATURES
          </a>
        </li>
        <li>
          <a className="link" href="#otherlaws">
            10. DO OTHER REGIONS HAVE SPECIFIC PRIVACY RIGHTS?
          </a>
        </li>
        <li>
          <a className="link" href="#policyupdates">
            11. DO WE MAKE UPDATES TO THIS NOTICE?
          </a>
        </li>
        <li>
          <a className="link" href="#contact">
            12. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
          </a>
        </li>
        <li>
          <a className="link" href="#request">
            13. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM
            YOU?
          </a>
        </li>
      </ul>
      <h2 data-custom-class="heading_1" id="infocollect">
        1. WHAT INFORMATION DO WE COLLECT?
      </h2>
      <p>
        <strong>Personal information you disclose to us:</strong> We collect
        personal information that you voluntarily provide to us when you
        register on the Services, express an interest in obtaining information
        about us or our products and Services, when you participate in
        activities on the Services, or otherwise when you contact us.
      </p>
      <ul>
        <li>email addresses</li>
        <li>phone numbers</li>
        <li>names</li>
        <li>usernames</li>
        <li>passwords</li>
        <li>contact or authentication data</li>
        <li>debit/credit card numbers</li>
      </ul>
      <h2 data-custom-class="heading_2" id="sensitiveinfo">
        Sensitive Information
      </h2>
      <p>
        When necessary, with your consent or as otherwise permitted by
        applicable law, we process the following categories of sensitive
        information:
      </p>
      <ul>
        <li>financial data</li>
      </ul>
      <p>
        All personal information that you provide to us must be true, complete,
        and accurate, and you must notify us of any changes to such personal
        information.
      </p>
      <h2 data-custom-class="heading_1" id="infouse">
        2. HOW DO WE PROCESS YOUR INFORMATION?
      </h2>
      <p>
        We process your information to provide, improve, and administer our
        Services, communicate with you, for security and fraud prevention, and
        to comply with law. We may also process your information for other
        purposes with your consent.
      </p>
      <h2 data-custom-class="heading_1" id="whoshare">
        3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
      </h2>
      <p>
        We may share information in specific situations and with specific third
        parties, including:
      </p>
      <ul>
        <li>
          Business Transfers: We may share or transfer your information in
          connection with, or during negotiations of, any merger, sale of
          company assets, financing, or acquisition of all or a portion of our
          business to another company.
        </li>
        <li>
          Affiliates: We may share your information with our affiliates, in
          which case we will require those affiliates to honor this Privacy
          Notice.
        </li>
        <li>
          Business Partners: We may share your information with our business
          partners to offer you certain products, services, or promotions.
        </li>
      </ul>
      <h2 data-custom-class="heading_1" id="infosafe">
        6. HOW DO WE KEEP YOUR INFORMATION SAFE?
      </h2>
      <p>
        We have implemented appropriate and reasonable technical and
        organizational security measures designed to protect the security of any
        personal information we process. However, despite our safeguards and
        efforts to secure your information, no electronic transmission over the
        Internet or information storage technology can be guaranteed to be 100%
        secure.
      </p>
      <h2 data-custom-class="heading_1" id="privacyrights">
        8. WHAT ARE YOUR PRIVACY RIGHTS?
      </h2>
      <p>
        You may review, change, or terminate your account at any time, depending
        on your country, province, or state of residence.
      </p>
      <h2 data-custom-class="heading_1" id="contact">
        12. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
      </h2>
      <p>
        If you have questions or comments about this notice, you may email us at{" "}
        <a className="link" href="mailto:rendellebertes24@gmail.com">
          rendellebertes24@gmail.com
        </a>
        .
      </p>
      <h2 data-custom-class="heading_1" id="request">
        13. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?
      </h2>
      <p>
        You have the right to request access to the personal information we
        collect from you, details about how we have processed it, correct
        inaccuracies, or delete your personal information. You may also have the
        right to withdraw your consent to our processing of your personal
        information.
      </p>
    </Modal>
  );
};

export default PrivacyPolicyModal;
