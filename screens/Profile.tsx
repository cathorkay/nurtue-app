import { useState } from "react";
import { NativeModules, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import BlueButton from "../components/BlueButton";
import BlueRingView from "../components/BlueRingView";
import Dialog from "../components/Dialog";
import MockPhoto from "../components/MockPhoto";
import OrangeButton from "../components/OrangeButton";
import Text from "../components/Text";
import TextButton from "../components/TextButton";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import { persistor, useAppSelector } from "../data/store";
import { getChildrenDescription } from "../lib/format";
import Root from "../navigation/Root";
import { ProfileStackScreenProps } from "../types/navigation";
import { Parent } from "../types/state";
import { UserSelection } from "./NewAgreement";

import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";


const ProfileScreen: React.FC<ProfileStackScreenProps<"Profile">> = () => {
  const insets = useSafeAreaInsets();

  const user = useAppSelector((state) => state.profileState.profile);

  const [unimpDialogOpen, setUnimpDialogOpen] = useState(false);
  const [termsDialogOpen, setTermsDialogOpen] = useState(false);

  // this feature is unimplemented 

  const handleUnimpDialogOpen = () => {
    setUnimpDialogOpen(true);
  };

  const handleUnimpDialogClose = () => {
    setUnimpDialogOpen(false);
  };

  const handleEditPress = () => {
    handleUnimpDialogOpen();
  };

  // terms and conditions

  const handleTermsDialogOpen = () => {
    setTermsDialogOpen(true);
  };

  const handleTermsDialogClose = () => {
    setTermsDialogOpen(false);
  };

  const handleTerms = () => {
    handleTermsDialogOpen();
  };

  // privacy policy

  const handlePrivPol = () => {
    handleUnimpDialogOpen();
  };

  const handleReset = async () => {
    await persistor.purge();
    persistor.persist();
    NativeModules.DevSettings.reload();
  };

  const auth = getAuth();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
    >
      <BlueRingView
        style={styles.photoContainer}
        borderRadius={100}
        ringWidth={16}
      >
        <MockPhoto style={styles.photo} name={user.user.photo} />
      </BlueRingView>
      <BlueRingView borderRadius={20}>
        <View style={styles.infoContainer}>
          <Text style={styles.nameText}>{auth.currentUser.displayName}</Text>
          <Text>{getChildrenDescription(user.user as Parent)}</Text>
          <BlueButton shadow style={{marginTop: 12}} onPress={handleEditPress}>
            Edit Profile
          </BlueButton>
        </View>
      </BlueRingView>
      <Text style={styles.sectionText}>My Family</Text>
      {user.spouse && (
        <UserSelection style={styles.userBox} user={user.spouse} />
      )}
      {user.children?.map((c) => (
        <UserSelection style={styles.userBox} key={c.user.id} user={c} />
      ))} 

      <View style={styles.termsPrivContainer}>
        <TextButton style={styles.resetButton} onPress={handleTerms}>
          Terms & Conditions
        </TextButton>
        <TextButton onPress={handlePrivPol}>
          Privacy Policy
        </TextButton>
      </View>

      <OrangeButton shadow style={{marginTop: 12}} onPress={handleReset}>
        Log Out
      </OrangeButton>

      {/* <TextButton style={styles.resetButton} onPress={handleReset}>
        Reset App (DEV ONLY)
      </TextButton> */}

      <Text style={{
        marginVertical: 30,
        textAlign: 'center',
        color: Colors.bluegreen,
        flexDirection: 'row',
      }}>Copyright 2022 - Nurtue, Inc.</Text>


      <Dialog isVisible={unimpDialogOpen} title="Unimplemented" type="success">
        <Text style={styles.dialogText}>
          This feature has not been implemented.
        </Text>
        <BlueButton
          style={styles.dialogButton}
          selected
          onPress={handleUnimpDialogClose}
        >
          Ok
        </BlueButton>
      </Dialog>

      <Dialog isVisible={termsDialogOpen} title="Terms & Conditions" type="success">
        <Text style={{fontSize: 12, textAlign: "justify"}}>
        {'\n'}The following terms and conditions, together with any document they incorporate by reference, including without limitation the Privacy Policy (collectively, these “Terms of Use”) apply to your access to and use of the websites and mobile application (collectively, our “Services”) provided by Nurtue, Inc. and its affiliates (“Nurtue” or “we”). These Terms of Use and our Privacy Policy are designed to comply with federal and state consumer privacy laws. By clicking to indicate your acceptance or otherwise using our Services, you agree to these Terms. If you do not agree to these Terms, including the mandatory arbitration provision and class action waiver in Section 13, you may not use our Services. In addition to these Terms, we may ask you to accept additional terms that apply to specific features, promotions, products or services (including, but not limited to, posted fees, billing procedures, promotion rules and subscription services). To the extent any additional terms conflict with these Terms, the additional terms govern with respect to your access to or use of the applicable feature, promotions, product or service.Please refer to our Privacy Policy at for information about how we collect, use and disclose information about you.{'\n'}
        PLEASE BE AWARE THAT THESE TERMS INCLUDE LIMITATIONS ON THE LIABILITY OF NURTUE AND OUR OBLIGATIONS RELATING TO THE SERVICES, CERTAIN CONDITIONS WITH RESPECT TO JURISDICTION, AND CERTAIN EXCLUSIONS OF NURTUE’S RESPONSIBILITY. THE SERVICES DO NOT INCLUDE MEDICAL OR PSYCHIATRIC ADVICE.{'\n'}
        1. ELIGIBILITY{'\n'}
        a. You must be at least 13 years of age to access or use our Services. If you are under 18 years of age (or the age of legal majority where you live), you may only access or use our Services under the supervision of a parent or legal guardian who agrees to be bound by these Terms. If you are a parent or legal guardian of a user under the age of 18 (or the age of legal majority where you live), you agree to be bound by these Terms and any applicable additional terms, and are fully responsible for the acts or omissions of such user in connection with our Services.The Services are for personal use only. Organizations, companies, or businesses may not use the Services for any purpose. You may not use the Services if you have previously been suspended or removed from the Services. Certain Services may not be available in all jurisdictions, and we reserve the right to impose additional eligibility requirements.{'\n'}
        b. The Services are intended for access and use from within the continental United States, Alaska, Hawaii, Puerto Rico or other U.S. territories (the “United States”). If you choose to access the Services from outside of the United States, you do so at your own risk and are responsible for compliance with all local laws, rules, and regulations that may apply.{'\n'}
        2. USER ACCOUNTS{'\n'}
        You may need to register for an account to access some or all of our Services. If you register for an account, you must provide accurate account information and promptly update this information if it changes. You must maintain the security of your account and account credentials, and you are responsible for any activities on your account and promptly notify us if you discover or suspect that someone has accessed your account without your permission. If you permit others to use your account credentials, you are responsible for the activities of those users.{'\n'}
        CONTENTS{'\n'}
        The contents of our Services, such as text, graphics, images, information obtained from Nurtue's licensors, and other material contained the Services ("Content") are for informational purposes only. The Content is not intended to be a substitute for professional medical or psychiatric advice, diagnosis, or treatment. Always seek the advice of qualified mental health provider with any question you may have. Nurtue does not recommend or endorse any specific tests, psychologist, social worker, mental health care provider, products, procedures, opinions, or other information that may be mentioned on the Services. Reliance on any information provided by Nurtue, Nurtue employees, others appearing on the Services at the invitation of Nurtue, or other visitors to the Services is solely at your own risk. Unless otherwise noted, all Contents on the Services, whether publicly posted or privately transmitted, as well as all derivative works are property owned, controlled, licensed or used with permission by Nurtue, and/or its parents, subsidiaries and affiliates or other parties that have licensed to or otherwise permitted their material to be used by Nurtue. The services as a whole and their Contents are protected by copyright, trademark, trade dress and other laws and all worldwide right, title and interest in and to the Services and its Contents are owned by Nurtue or used with permission. Nurtue, the Nurtue logos, and all other trademarks appearing on the services are trademarks of Nurtue or are licensed or used with permission of the owner by Nurtue. You agree not to display or use such trademarks without Nurtue’s prior written permission. Nurtue disclaims any proprietary interest in trademarks, service marks, logos, slogans, domain names and trade names other than its own.The Contents of the Services, and the Services as a whole, are intended solely for personal, non-commercial use by the users of the Services and may not be used except as permitted in these Terms of Use. You may share Content from the site with the use of the social media links (i.e. “share:” “pin it” and “tweet”) provided on our Services. You may also share content from the Services via email through the use of our “share” link. Except as noted above, you may not reproduce, republish, publish, upload, post, transmit, distribute (including by email or other electronic means), publicly display, modify, create derivative works from, sell or participate in any sale of, or exploit in any way, in whole or in part, any of the Contents, the Services, or any related software without the prior written consent of Nurtue or the owner of such material. Nothing contained on the services grants or should be construed as granting, any license or right to use, implied or otherwise, any trademarks, trade names, service marks, trade dress, copyrighted or other proprietary material displayed on this Services without the prior written consent of Nurtue or the owner of such material. All rights not expressly granted herein by Nurtue to you are reserved by Nurtue and/or its licensors. Third-party trade names, product names, and logos, contained in this website may be the trademarks or registered trademarks of their respective owners. You are hereby granted a limited, non-exclusive, non transferable, non-sublicensable, revocable license to use our Services for your own personal use and to install our mobile applications on a device that you own or control; however, such license is subject to these Terms and does not include any right to:modify the Services, remove any proprietary rights notices or markings, or otherwise make any derivative uses of our Services;reverse engineer any aspect of our Services or do anything that might discover source code or bypass or circumvent measures employed to prevent or limit access to any part of our Services; or use our Services other than for their intended purposes.{'\n'}
        Any use of our Services other than as specifically authorized herein, without our prior written permission, is strictly prohibited and will terminate the license granted herein.The information presented on or through the Services is made available solely for general information purposes. We may update the Content on this Services from time to time, but we cannot guarantee that the Content is complete or up-to-date. Any of the material on the Services may be out of date at any given time, and we will try to update such material from time to time.Our Services, including the text, graphics, images, photographs, videos, illustrations, trademarks, trade names, service marks, logos, slogans and other content contained therein, are owned by or licensed to Nurtue and are protected under both United States and foreign laws. Except as explicitly stated in these Terms, Nurtue and our licensors reserve all rights in and to our Services.{'\n'}
        NURTUE PAYMENT TERMS{'\n'}
        Nurtue may offer different types of digital content for which you may (a) purchase a limited license to use via the Services (“Purchased Content”) or (b) earn or otherwise receive a limited license to use via the Services ((“Earned Content” together with the Purchased Content, collectively, “Accessible Content”). You understand that while you may “earn” “buy” or “purchase” Accessible Contents in our Services, you do not legally “own” the Accessible Contents.{'\n'}
        Payment and Billing. Your purchase of Accessible Contents through platforms such as the Apple App Store, Google Play, Amazon or Facebook is subject to those platforms’ payment terms and conditions and Nurtue is not a party to the transaction. Nurtue does not control how you can pay or how any refunds may be issued on those platforms. Please review those platforms’ terms of service for additional information. You represent and warrant that you are authorized to use the payment method you use to purchase Accessible Contents. You authorize the applicable platform to charge your payment method for the total amount of your purchase (including any applicable taxes and other charges). If the payment method cannot be verified, is invalid or is otherwise not acceptable, your order may be suspended or canceled. You must resolve any problem encountered in order to proceed with your order. When you acquire a limited license to use Accessible Contents from our Services, we and/or the platform may send you an acknowledgment email that will have details of the items you have ordered. Please check that the details in the acknowledgment message are correct as soon as possible and keep a copy of it for your records.{'\n'}
        Pricing and Taxes. All prices for Accessible Contents are shown in U.S. dollars and do not include applicable taxes and other charges, unless we state otherwise. Prices for Contents are subject to change at any time, but changes will not affect any order you have already placed. You are responsible for any sales, use, value-added or other governmental taxes, fees or duties due with respect to your order. We may collect applicable taxes if we determine we have a duty to collect taxes.Subscriptions. We may offer different subscription plans for purchasing Contents (each, a “Subscription”). WHEN YOU PURCHASE A SUBSCRIPTION,YOU AUTHORIZE THE PLATFORM YOU USE TO ACQUIRE THE CONTENTS, SUCH AS APPLE APP STORE, GOOGLE PLAY, AMAZON OR FACEBOOK, TO CHARGE YOUR DESIGNATED PAYMENT METHOD FOR THE PERIOD (E.G., MONTHLY OR ANNUALLY) SPECIFIED IN YOUR SUBSCRIPTION (IN ADDITION TO ANY APPLICABLE TAXES AND OTHER CHARGES) FOR AS LONG AS YOUR SUBSCRIPTION CONTINUES, ANDYOUR SUBSCRIPTION IS CONTINUOUS UNTIL YOU CANCEL IT OR WE SUSPEND OR STOP PROVIDING ACCESS TO OUR SERVICES OR PRODUCTS IN ACCORDANCE WITH THESE TERMS. YOU MAY CANCEL YOUR SUBSCRIPTION BY CALLING OUR TOLL-FREE TELEPHONE NUMBER +1 (888) 807-2330 OR CONTACTING US AT THE FOLLOWING EMAIL HI@PARENTLAB.COM. ADDITIONAL INFORMATION ON CANCELLING YOUR SUBSCRIPTION MAYBE FOUND BELOW.{'\n'}
        Please view the FAQ section for subscription for additional details. As part of your Subscription to the Services, you will receive 2 Credits every month. The Credits, as detailed below, can be used to access Accessible Content and or unlock additional features.{'\n'}
        a. Trial Period. From time to time, Nurtue offers some customers trial or other promotional subscriptions to Services. Such trial or promotional subscriptions are subject to these Terms except as otherwise stated in the promotional offer. Only one trial or promotional Subscription is available per valid account. Nurtue will bill you the applicable fee after your free trial period has expired. If you cancel Services before the trial period has expired, Nurtue will not charge you.{'\n'}
        b. Canceling Subscriptions. YOU MAY CANCEL YOUR SUBSCRIPTION AT ANY TIME EITHER THROUGH THE TOOLS MADE AVAILABLE BY THE APPLICABLE PLATFORM (SUCH AS APPLE APP STORE, GOOGLE PLAY, AMAZON OR FACEBOOK) OR CONTACTING NURTUE AS SET FORTH ABOVE. SUBSCRIPTIONS MUST BE CANCELLED BEFORE THE BILLING OR RENEWAL DATE IN ORDER TO AVOID BEING CHARGED FOR THE NEXT SUBSCRIPTION PERIOD. IF YOU CANCEL YOUR SUBSCRIPTION AFTER THE APPLICABLE BILLING OR RENEWAL DATE, IT WILL NOT TAKE EFFECT UNTIL THE FOLLOWING SUBSCRIPTION PERIOD. YOU WILL BE RESPONSIBLE FOR ALL CHARGES (INCLUDING ANY APPLICABLE TAXES AND OTHER CHARGES) INCURRED WITH RESPECT TO ANY SUBSCRIPTION ORDER PROCESSED PRIOR TO THE EFFECTIVE DATE OF YOUR CANCELLATION. IF AN USER HAS NOT USED ANY OF THE CREDITS DURING THEIR SUBSCRIPTION PERIOD, USER MAY BE ELIGIBLE FOR A REFUND OF SUBSCRIPTION FEES ON A CASE BY CASE BASIS. PLEASE SEE THE FAQS FOR ADDITIONAL DETAILS.{'\n'}
        c. Credits. Users may also access the Accessible Content by using credits. Credits are in-app currencies that can be used to unlock modules or additional features (“Credit(s)”). There is no expiration date with regards to credits and any unused credits will remain in user’s account so long as user has not deleted their account. All Accessible Content purchased with Credits will remain accessible to the user even if the user does not have a current Subscription to the Services.{'\n'}
        d. Restrictions. All sales of Content are final, and Contents are non-returnable and non-refundable. Contents cannot be resold, transferred for value, redeemed for cash or applied to any other account. YOU ACKNOWLEDGE THAT NURTUE IS NOT REQUIRED TO PROVIDE A REFUND FOR ANY REASON, AND THAT YOU WILL NOT RECEIVE MONEY OR OTHER COMPENSATION FOR UNUSED CONTENTS WHEN AN ACCOUNT IS CLOSED, WHETHER SUCH CLOSURE WAS VOLUNTARY OR INVOLUNTARY, WHETHER YOU MADE A PAYMENT THROUGH A PLATFORM, SUCH AS APPLE APP STORE, GOOGLE PLAY, AMAZON OR FACEBOOK, OR ANY OTHER SITES OR PLATFORMS WHERE WE OFFER OUR SERVICES.Errors. In the event of an error, we reserve the right to correct such error and revise your order accordingly (which includes charging the correct price) or to cancel the order and refund any amount charged.{'\n'}
        USER CONTENT{'\n'}
        Our Services may allow you and other users to create, post, store and share content, including messages, text, photos, videos, software, artwork, audio, music, animations and other materials (collectively, “User Content”). Except for the license you grant below, as between you and Nurtue, you retain all rights in and to your User Content. You grant Nurtue a perpetual, irrevocable, non-exclusive, royalty-free, worldwide, fully-paid, and sub-licensable license to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, publicly perform and display your User Content and any name, username or likeness provided in connection with your User Content in all media formats and channels now known or later developed without compensation to you.{'\n'}
        COMMUNITY GUIDELINES{'\n'}
        You are solely responsible for your conduct while accessing or using our Services, and you will not:Violate any applicable law, contract, intellectual property or other third-party right or commit a tort;Engage in any abusive, disrespectful, harassing, threatening, intimidating, violent, predatory or stalking conduct;Use or attempt to use another user’s account without authorization from that user and Nurtue;Use our Services in any manner that could interfere with, disrupt, spam, negatively affect or inhibit other users from fully enjoying our Services or that could damage, disable, overburden or impair the functioning of our Services in any manner;Attempt to circumvent any content-filtering techniques we employ or attempt to access or tamper with any feature or area of our Services that you are not authorized to access, which includes any attempt to probe, scan, or test the vulnerability of any system or network, or breach or circumvent any security or authentication measures;Develop or use any applications that interact with our Services without our prior written consent;Sell, rent or purchase account interactions (such as selling, renting or purchasing followers, re-sharing a post, likes, etc.);Use any data mining, scraping, robots or similar data gathering or extraction methods;Bypass or ignore instructions contained in any robots.txt file we provide that controls automated access to portions of our Services; or Use our Services for any illegal or unauthorized purpose, or engage in, encourage or promote any activity that violates these Terms.You may also only post or otherwise share User Content that is non-confidential and you have all necessary rights to disclose. You may not create, post, store or share any User Content that:Is unlawful, libelous, defamatory, obscene, pornographic, discriminatory, indecent, lewd, suggestive, harassing, bullying, threatening, invasive of privacy or publicity rights, abusive, inflammatory or fraudulent;Includes content that directly attacks, threatens, or incites harm against other people based on their race, ethnicity, national origin, religious affiliation, sexual orientation, sex, gender, gender identity, disabilities or diseases;Would constitute, encourage or provide instructions for a criminal offense, promote self-injury or suicide, violate the rights of any party or otherwise create liability or violate any local, state, national or international law;May infringe any patent, trademark, trade secret, copyright or other intellectual or proprietary right of any party;Contains or depicts any statements, remarks or claims that do not reflect your honest views and experiences or are otherwise false or misleading;Contains duplicative content over multiple accounts or duplicate updates on one account;Impersonates, or misrepresents your affiliation with, any person or entity;Contains any unsolicited promotions, political campaigning, advertising or solicitations;Contains any private or personal information of a third party without such third party’s consent;Contains any viruses, malware, corrupted data or other harmful, disruptive or destructive files or content; orIs, in our sole judgment, objectionable or that restricts or inhibits any other person from using or enjoying our Services, or that may expose Nurtue or others to any harm or liability of any type.{'\n'}
        Although we have no obligation to screen, edit or monitor User Content, we may delete or remove User Content at any time and for any reason. We have absolute discretion to determine if any user violates these above rules, and to act as we deem appropriate in the event of any violation. Violations of system or network security may result in civil or criminal liability.We will investigate occurrences which may involve such violations and may involve, cooperate with, and make disclosures to, law enforcement authorities in identifying and prosecuting users who are involved in such violations. Without limiting the foregoing, we have the right to fully cooperate with any law enforcement authorities or court order requesting or directing us to disclose the identity or other information of anyone posting any materials on or through the Services. YOU WAIVE AND HOLD HARMLESS THE COMPANY AND ITS AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, LICENSORS, AND SERVICE PROVIDERS FROM ANY CLAIMS RESULTING FROM ANY ACTION TAKEN BY ANY OF THE FOREGOING PARTIES DURING OR AS A RESULT OF ITS INVESTIGATIONS AND FROM ANY ACTIONS TAKEN AS A CONSEQUENCE OF INVESTIGATIONS BY EITHER SUCH PARTIES OR LAW ENFORCEMENT AUTHORITIES.{'\n'}
        However, we cannot review all material before it is posted on the Services and cannot ensure prompt removal of objectionable material after it has been posted. Accordingly, to the fullest extent permitted by applicable law, we assume no liability for any action or inaction regarding transmissions, communications or User Content provided by any user or third party. We have no liability or responsibility to anyone for performance or nonperformance of the activities described in this section.{'\n'}
        HYPERLINKS{'\n'}
        You may create a text hyperlink to our Services for noncommercial purposes, provided such link does not portray Nurtue or any of its products and services in a false, misleading, derogatory or otherwise defamatory manner and provided further that the linking site does not contain any adult or illegal material or any material that is offensive, harassing or otherwise objectionable. This limited permission may be revoked at any time. You will not use the Nurtue logo or other proprietary graphics of Nurtue to link to our Services without our express written permission.{'\n'}
        THIRD-PARTY CONTENT{'\n'}
        In addition to User Content, Nurtue may provide third-party content on our Services and may provide links to web pages and content of third parties (collectively, the “Third-Party Content”). Nurtue does not endorse or adopt any Third-Party Content and can make no guarantee as to its accuracy or completeness. Nurtue does not create, update, or monitor Third-Party Content and is not responsible for any Third-Party Content. You are responsible for deciding if you want to access or use Third-Party Content or applications that link from our Services. Your correspondence or business dealings with, or participation in promotions of, or advertisers found on or through our Services are solely between you and such advertiser. Access and use of such Third-Party Content, including the information, materials, products, and services on or available through any third party sites is solely at your own risk.{'\n'}
        FEEDBACK{'\n'}
        All comments, feedback, suggestions, ideas, and other submissions disclosed, submitted or offered to Nurtue on or by the Services or otherwise disclosed, submitted or offered in connection with your use of the Services (collectively, “Comments”) shall be and remain Nurtue’s property. Such disclosure, submission or offer of any Comments shall constitute an assignment to Nurtue of all worldwide right, title and interest in all copyrights and other intellectual properties in the Comments. Nurtue is and shall be under no obligation (1) to maintain any Comments in confidence; (2) to pay to user any compensation for any Comments; or (3) to respond to any user Comments.You agree that none of the Comments submitted by you to the Services will violate any right of any third party, including copyright, trademark, privacy or other personal or proprietary right(s). You further agree that none of the Comments submitted by you to the Services will be or contain libelous or otherwise unlawful, abusive or obscene material. You are and shall remain solely responsible for the content of any Comments you make. {'\n'}
        WARRANTY, LIABILITY & INDEMNIFICATION BECAUSE SOME JURISDICTIONS DO NOT ALLOW EXCLUSIONS OF IMPLIED WARRANTIES, LIMITATIONS ON HOW LONG AN IMPLIED WARRANTY LASTS, OR THE EXCLUSION OR LIMITATION OF LIABILITY FOR CONSEQUENTIAL OR INCIDENTAL DAMAGES, THE BELOW LIMITATIONS MAY NOT APPLY TO YOU.{'\n'}
        The use of the Nurtue Services and the Content is at your own risk. When using the Nurtue Services, information will be transmitted over a medium that may be beyond the control and jurisdiction of Nurtue and its suppliers. Accordingly, Nurtue assumes no liability for or relating to the delay, failure, interruption, or corruption of any data or other information transmitted in connection with the use of the Nurtue Services.The Nurtue Services and the Content are provided on an "as is" basis. {'\n'}
        NURTUE, ITS LICENSORS, AND ITS SUPPLIERS, TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, DISCLAIM ALL WARRANTIES, EITHER EXPRESS OR IMPLIED, STATUTORY OR OTHERWISE, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, NON-INFRINGEMENT OF THIRD PARTY RIGHTS, AND FITNESS FOR PARTICULAR PURPOSE.{'\n'}
        Without limiting the foregoing, Nurtue, its licensors, and its suppliers make no representations or warranties about the following:{'\n'}
        a. The accuracy, reliability, completeness, correctness, or timeliness of the Content, software, text, graphics, links, or communications provided on or through the use of the Nurtue Services or Nurtue. The satisfaction of any government regulations requiring disclosure of information or the approval or compliance of any software tools with regard to the Content contained on the Nurtue Services.{'\n'}
        TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL NURTUE, ITS LICENSORS, ITS SUPPLIERS, OR ANY THIRD PARTIES MENTIONED ON THE NURTUE SERVICES BE LIABLE FOR ANY DAMAGES (INCLUDING, WITHOUT LIMITATION, INCIDENTAL AND CONSEQUENTIAL DAMAGES, PERSONAL INJURY/WRONGFUL DEATH, LOST PROFITS, OR DAMAGES RESULTING FROM LOST DATA OR BUSINESS INTERRUPTION) RESULTING FROM THE USE OF OR INABILITY TO USE THE NURTUE SERVICES OR THE CONTENT, WHETHER BASED ON WARRANTY, CONTRACT, TORT, OR ANY OTHER LEGAL THEORY, AND WHETHER OR NOT NURTUE IS ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. NURTUE AND ITS LICENSORS ARE NOT LIABLE FOR ANY PERSONAL INJURY, INCLUDING DEATH, CAUSED BY YOUR USE OR MISUSE OF THE SERVICES OR CONTENT. ANY CLAIMS ARISING IN CONNECTION WITH YOUR USE OF THE SERVICES OR ANY CONTENT MUST BE BROUGHT WITHIN ONE (1) YEAR OF THE DATE OF THE EVENT GIVING RISE TO SUCH ACTION OCCURRED. REMEDIES UNDER THESE TERMS OF USE ARE EXCLUSIVE AND ARE LIMITED TO THOSE EXPRESSLY PROVIDED FOR IN THESE TERMS OF USE.THE TOTAL LIABILITY OF NURTUE PARTIES (AS DEFINED BELOW), FOR ANY CLAIM ARISING OUT OF OR RELATING TO THESE TERMS OF USE OR OUR SERVICES, REGARDLESS OF THE FORM OF THE ACTION, IS LIMITED TO THE GREATER OF $100 OR THE AMOUNTS PAID BY YOU TO NURTUE VIA THE SERVICES IN THE 6 MONTHS PRIOR TO THE CLAIM.{'\n'}
        The limitations set forth in this section will not limit or exclude liability for the gross negligence, fraud or intentional misconduct of Nurtue Parties or for any other matters in which liability cannot be excluded or limited under applicable law. Additionally, some jurisdictions do not allow the exclusion or limitation of incidental or consequential damages, so the above limitations or exclusions may not apply to you.You agree to defend, indemnify, and hold Nurtue, its officers, directors, employees, agents, licensors, and suppliers (the “Nurtue Parties”), harmless from and against any claims, actions or demands, liabilities and settlements including without limitation, reasonable legal and accounting fees, resulting from, or alleged to result from, your violation of these Terms of Use.You will promptly notify the indemnified Nurtue Parties of any claim, cooperate with the indemnified Nurtue Parties in defending the claim and pay all fees, costs and expenses associated with defending the claim (including, but not limited to, attorneys’ fees). The indemnified Nurtue Parties will have right to retain sole control of the defense or settlement of any claim (at your expense). This indemnity is in addition to, and not in lieu of, any other indemnities set forth in a written agreement between you and Nurtue or the other Nurtue Parties.{'\n'}
        RELEASE{'\n'}
        To the fullest extent permitted by applicable law, you release Nurtue Parties from responsibility, liability, claims, demands, and/or damages (actual and consequential) of every kind and nature, known and unknown (including, but not limited to, claims of negligence), arising out of or related to disputes between users and the acts or omissions of third parties. You expressly waive any rights you may have under California Civil Code § 1542 as well as any other statute or common law principles that would otherwise limit the coverage of this release to include only those claims which you may know or suspect to exist in your favor at the time of agreeing to this release.{'\n'}
        TRANSFER AND PROCESSING DATA{'\n'}
        By accessing or using our Services, you consent to the processing, transfer, and storage of information about you in and to the United States and other countries, where you may not have the same rights and protections as you do under the local law.{'\n'}
        DISPUTE RESOLUTION; BINDING ARBITRATION{'\n'}
        Please read the following section carefully because it requires you to arbitrate certain disputes and claims with Nurtue and limits the manner in which you can seek relief from us. This Section 13 only applies to you if you are a resident of the United States or if you commence any action against Nurtue in the United States.Except for small claims disputes in which you or Nurtue seek to bring an individual action in small claims court located in the county of your billing address or disputes in which you or Nurtue seeks injunctive or other equitable relief for the alleged unlawful use of intellectual property, you and Nurtue waive your rights to a jury trial and to have any dispute arising out of or related to these Terms or our Services resolved in court. Instead, all disputes arising out of or relating to these Terms or our Services will be resolved through confidential binding arbitration held in San Francisco County, California in accordance with the Streamlined Arbitration Rules and Procedures (“Rules”) of the Judicial Arbitration and Mediation Services (“JAMS”), which are available on the JAMS website and are hereby incorporated by reference. You either acknowledge and agree that you have read and understand the rules of JAMS or waive your opportunity to read the rules of JAMS and any claim that the rules of JAMS are unfair or should not apply for any reason.You and Nurtue agree that any dispute arising out of or related to these Terms or our Services is personal to you and Nurtue and that any dispute will be resolved solely through individual arbitration and will not be brought as a class arbitration, class action or any other type of representative proceeding.You and Nurtue agree that these Terms affect interstate commerce and that the enforceability of this Section 13 will be substantively and procedurally governed by the Federal Arbitration Act, 9 U.S.C. § 1, et seq. (the “FAA”), to the maximum extent permitted by applicable law. As limited by the FAA, these Terms and the JAMS Rules, the arbitrator will have exclusive authority to make all procedural and substantive decisions regarding any dispute and to grant any remedy that would otherwise be available in court; provided, however, that the arbitrator does not have the authority to conduct a class arbitration or a representative action, which is prohibited by these Terms. The arbitrator may only conduct an individual arbitration and may not consolidate more than one individual’s claims, preside over any type of class or representative proceeding or preside over any proceeding involving more than one individual. You and Nurtue agree that for any arbitration you initiate, the party filing the claim will pay the filing fee and the parties will split the remaining JAMS fees and costs. You and Nurtue agree that the state or federal courts of the State of California and the United States sitting in Los Angeles, California have exclusive jurisdiction over any appeals and the enforcement of an arbitration award. ANY CLAIM ARISING OUT OF OR RELATED TO THESE TERMS OR OUR SERVICES MUST BE FILED WITHIN ONE YEAR AFTER SUCH CLAIM AROSE; OTHERWISE, THE CLAIM IS PERMANENTLY BARRED, WHICH MEANS THAT YOU AND NURTUE WILL NOT HAVE THE RIGHT TO ASSERT THE CLAIM. You have the right to opt out of binding arbitration within thirty (30) days of the date you first accepted the terms of this Section 13 by emailing hello@nurtue.app. In order to be effective, the opt out notice must include your full name and clearly indicate your intent to opt out of binding arbitration. By opting out of binding arbitration, you are agreeing to resolve Disputes in accordance with Section 13.{'\n'}
        GOVERNING LAW AND VENUE{'\n'}
        These Terms and your access to and use of our Services will be governed by and construed and enforced in accordance with the laws of California, without regard to conflict of law rules or principles (whether of California or any other jurisdiction) that would cause the application of the laws of any other jurisdiction. Any dispute between the parties that is not subject to arbitration or cannot be heard in small claims court will be resolved in the state or federal courts of California and the United States, respectively, sitting in Los Angeles, California.{'\n'}
        TERMINATION OR SUSPENSION{'\n'}
        We reserve the right, without notice and in our sole discretion, to terminate or suspend your right to access or use our Services or to discontinue all or a part of the Services. We are not responsible for any loss or harm related to your inability to access or use our Services.{'\n'}
        MISCELLANEOUS{'\n'}
        If any provision or part of a provision of these Terms is unlawful, void or unenforceable, that provision or part of the provision is deemed severable from these Terms and does not affect the validity and enforceability of any remaining provisions. These Terms constitute the entire agreement between you and Nurtue relating to your access to and use of our Services. The failure of Nurtue to exercise or enforce any right or provision of these Terms will not operate as a waiver of such right or provision. The section titles in these Terms are for convenience only and have no legal or contractual effect. Except as otherwise provided herein, these Terms are intended solely for the benefit of the parties and are not intended to confer third-party beneficiary rights upon any other person or entity. All of your transactions and communications with us may, at our option, be conducted electronically.{'\n'}
        CHANGES TO TERMS{'\n'}
        We may make changes to these Terms from time to time. If we make changes, we will provide notice of such changes, such as by sending an email notification, providing notice through our Services, or posting the amended Terms to our Services and updating the “Last Updated” date above. Unless we say otherwise in our notice, the amended Terms will be effective immediately and your continued access to and use of our Services after we provide notice will confirm your acceptance of the changes. If you do not agree to the amended Terms, you must stop accessing and using our Services.{'\n'}
        CONTACT{'\n'}
        If you have any questions or concerns regarding the Services or these Terms, please contact Nurtue. by emailing us at hello@nurtue.app.{'\n'}
        ADDITIONAL TERMS FOR IOS USERS{'\n'}
        The following terms apply if you are accessing or using our mobile application (“App”) on an Apple Inc. (“Apple”) branded mobile device.{'\n'}
        Acknowledgment. The Terms are concluded between Nurtue and you only, and not with Apple, and, as between Apple and us, we are solely responsible for the App and the content thereof.{'\n'}
        Scope of License. {'\n'}
        The license granted to the you for the App under the Terms is limited to a non-transferable license to use the App on any Apple-branded products that you own or control and as permitted by the Apple Usage Rules set forth in the App Store Terms of Service, except that such App may be accessed, acquired, and used by other accounts associated with the purchaser via “Family Sharing” or volume purchasing.Liability. Subject to the Terms set forth herein, we, and not Apple, are responsible for addressing any claims of yours or any third party relating to the App or your possession and/or use of that App, including, but not limited to:product liability claims;any claim that the App fails to conform to any applicable legal or regulatory requirement; and claims arising under consumer protection or similar legislation.{'\n'}
        IP Claims. {'\n'}
        Subject to the Terms, in the event of any third-party claim that the App or your possession and use of that App infringes any third party’s intellectual property rights, we, not Apple, will be solely responsible for the investigation, defense, settlement and discharge of any such intellectual property infringement claim.{'\n'}
        </Text>
        <BlueButton
          style={styles.dialogButton}
          selected
          onPress={handleTermsDialogClose}
        >
          Ok
        </BlueButton>
      </Dialog>

      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.lightblue,
  },
  termsPrivContainer: {
    marginVertical: 5,
  },
  photoContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  photo: {
    width: 152,
    height: 152,
    borderRadius: 76,
  },
  infoContainer: {
    padding: 15,
    alignItems: "center",
  },
  nameText: {
    fontSize: FontSize.header,
    fontFamily: "semibold",
    marginBottom: 8,
    marginTop: -4,
  },
  sectionText: {
    fontFamily: "semibold",
    marginTop: 20,
  },
  editButton: {
    marginTop: 40,
  },
  resetButton: {
    marginTop: 40,
    color: 'red',
  },
  dialogText: {
    marginTop: 10,
  },
  dialogButton: {
    marginTop: 20,
  },
  userBox: {
    marginTop: 10,
  },
});

export default ProfileScreen;
