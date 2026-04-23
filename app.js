// VoteBuddy AI - JavaScript Logic

// --- Constants & State ---
let currentLang = 'en';
let currentMode = 'normal';
let checklistData = { step1: false, step2: false, step3: false, step4: false };

// --- I18n Dictionary ---
const i18n = {
    en: {
        welcomeTitle: "Welcome to VoteBuddy AI",
        welcomeSubtitle: "Your friendly guide to understanding elections. Ask me anything about voting, registration, or the election process — in simple language!",
        typing: "VoteBuddy is typing...",
        placeholder: "Ask me about elections, voting, or registration...",
        myth: "Myth",
        fact: "Fact",
        summary: "In short:",
        didYouMean: "I'm not completely sure. Did you mean to ask about:",
        errorMode: "Please select an option from the suggestions."
    },
    bn: {
        welcomeTitle: "ভোটবাডি এআই-তে স্বাগতম",
        welcomeSubtitle: "নির্বাচন বোঝার জন্য আপনার বন্ধুত্বপূর্ণ গাইড। আমাকে ভোট, নিবন্ধন বা নির্বাচন প্রক্রিয়া সম্পর্কে যেকোনো কিছু জিজ্ঞাসা করুন - সহজ ভাষায়!",
        typing: "ভোটবাডি টাইপ করছে...",
        placeholder: "আমাকে নির্বাচন, ভোট, বা নিবন্ধন সম্পর্কে জিজ্ঞাসা করুন...",
        myth: "মিথ",
        fact: "ফ্যাক্ট",
        summary: "সংক্ষেপে:",
        didYouMean: "আমি পুরোপুরি নিশ্চিত নই। আপনি কি এগুলোর সম্পর্কে জিজ্ঞাসা করতে চেয়েছিলেন:",
        errorMode: "অনুগ্রহ করে পরামর্শ থেকে একটি বিকল্প নির্বাচন করুন।"
    }
};

// --- Knowledge Base ---
const knowledgeBase = {
    "first time": {
        en: {
            normal: "Welcome, first-time voter! Here is your step-by-step guide:\n\n<div class='step'><div class='step-num'>1</div><div>**Register:** Apply for your Voter ID online through the NVSP portal or offline using Form 6.</div></div>\n<div class='step'><div class='step-num'>2</div><div>**Get Voter ID:** You will receive your EPIC (Voter ID card) via post.</div></div>\n<div class='step'><div class='step-num'>3</div><div>**Find Booth:** Check your name in the electoral roll and locate your polling booth.</div></div>\n<div class='step'><div class='step-num'>4</div><div>**Vote:** Go to the booth on election day, show your ID, and press the button on the EVM!</div></div>\n\n<div class='summary-box'><strong>In short:</strong> Register → Get ID → Find Booth → Vote!</div>",
            simple: "Voting is like choosing the captain of your class! \n\n1. First, you tell the school you want to vote (Registration).\n2. They give you a special ID card.\n3. On voting day, you go to a special room (Polling booth).\n4. You press a button next to the name of the person you like. Done!"
        },
        bn: {
            normal: "স্বাগতম, নতুন ভোটার! আপনার জন্য ধাপে ধাপে গাইড:\n\n<div class='step'><div class='step-num'>1</div><div>**নিবন্ধন:** এনভিএসপি পোর্টালে অনলাইনে বা ফর্ম ৬ ব্যবহার করে অফলাইনে আপনার ভোটার আইডির জন্য আবেদন করুন।</div></div>\n<div class='step'><div class='step-num'>2</div><div>**ভোটার আইডি পান:** আপনি ডাকযোগে আপনার এপিক (ভোটার আইডি কার্ড) পাবেন।</div></div>\n<div class='step'><div class='step-num'>3</div><div>**বুথ খুঁজুন:** ভোটার তালিকায় আপনার নাম পরীক্ষা করুন এবং আপনার ভোটকেন্দ্র সনাক্ত করুন।</div></div>\n<div class='step'><div class='step-num'>4</div><div>**ভোট দিন:** নির্বাচনের দিন বুথে যান, আপনার আইডি দেখান এবং ইভিএম-এ বোতাম টিপুন!</div></div>",
            simple: "ভোট দেওয়া হলো তোমার ক্লাসের ক্যাপ্টেন বেছে নেওয়ার মতো! \n\n১. প্রথমে, তুমি স্কুলকে বলো যে তুমি ভোট দিতে চাও (নিবন্ধন)।\n২. তারা তোমাকে একটি বিশেষ আইডি কার্ড দেয়।\n৩. ভোটের দিন, তুমি একটি বিশেষ ঘরে (ভোটকেন্দ্র) যাও।\n৪. তুমি যার নাম পছন্দ করো তার পাশের বোতাম টিপো। ব্যস!"
        },
        suggestions: ["What documents do I need?", "What is EVM?"]
    },
    "timeline": {
        en: {
            normal: "Here is the general election timeline:\n\n<div class='timeline-item'><div class='timeline-dot'></div><div class='timeline-line'>**Before Election:** Voter registration happens. The Election Commission announces dates.</div></div>\n<div class='timeline-item'><div class='timeline-dot'></div><div class='timeline-line'>**Campaigning:** Candidates campaign. It stops 48 hours before voting.</div></div>\n<div class='timeline-item'><div class='timeline-dot'></div><div class='timeline-line'>**Election Day:** Citizens go to polling booths to cast their votes securely.</div></div>\n<div class='timeline-item'><div class='timeline-dot'></div><div>**After Election:** EVMs are securely stored. Votes are counted on a specific day, and results are declared.</div></div>",
            simple: "Here is the timeline in simple words:\n\n1. **Before:** People write their names on the list. Leaders tell us their plans.\n2. **During (Voting Day):** Everyone goes to vote.\n3. **After:** People count the votes to see who won."
        },
        bn: {
            normal: "এখানে নির্বাচনের সাধারণ সময়রেখা দেওয়া হলো:\n\n<div class='timeline-item'><div class='timeline-dot'></div><div class='timeline-line'>**নির্বাচনের আগে:** ভোটার নিবন্ধন হয়। নির্বাচন কমিশন তারিখ ঘোষণা করে।</div></div>\n<div class='timeline-item'><div class='timeline-dot'></div><div class='timeline-line'>**প্রচারাভিযান:** প্রার্থীরা প্রচার করেন। ভোটের ৪৮ ঘণ্টা আগে এটি বন্ধ হয়ে যায়।</div></div>\n<div class='timeline-item'><div class='timeline-dot'></div><div class='timeline-line'>**নির্বাচনের দিন:** নাগরিকরা নিরাপদে তাদের ভোট দিতে ভোটকেন্দ্রে যান।</div></div>\n<div class='timeline-item'><div class='timeline-dot'></div><div>**নির্বাচনের পরে:** ইভিএম নিরাপদে সংরক্ষণ করা হয়। একটি নির্দিষ্ট দিনে ভোট গণনা করা হয় এবং ফলাফল ঘোষণা করা হয়।</div></div>",
            simple: "সহজ কথায় সময়রেখা:\n\n১. **আগে:** লোকেরা তালিকায় তাদের নাম লেখায়। নেতারা আমাদের তাদের পরিকল্পনা বলেন।\n২. **সময় (ভোটের দিন):** সবাই ভোট দিতে যায়।\n৩. **পরে:** কে জিতেছে তা দেখার জন্য ভোট গণনা করা হয়।"
        },
        suggestions: ["What happens on voting day?", "How are votes counted?"]
    },
    "document": {
        en: {
            normal: "To vote, you primarily need your **Voter ID Card (EPIC)**. \n\nHowever, if you don't have it on election day, you can use other approved photo IDs, such as:\n- Aadhaar Card\n- PAN Card\n- Driving License\n- Indian Passport\n\n*Note: Your name MUST be on the voter list (electoral roll).* \n\n<div class='summary-box'><strong>In short:</strong> Voter ID is best. No ID? Use Aadhaar/PAN, but name must be on the list.</div>",
            simple: "You need a special card called a **Voter ID**. \n\nIf you lose it, you can show other cards with your photo, like an Aadhaar card. But remember, your name must be on the big list of voters!"
        },
        bn: {
            normal: "ভোট দেওয়ার জন্য, আপনার মূলত **ভোটার আইডি কার্ড (EPIC)** প্রয়োজন। \n\nযাইহোক, নির্বাচনের দিন এটি না থাকলে, আপনি অন্যান্য অনুমোদিত ফটো আইডি ব্যবহার করতে পারেন, যেমন:\n- আধার কার্ড\n- প্যান কার্ড\n- ড্রাইভিং লাইসেন্স\n- ভারতীয় পাসপোর্ট\n\n*দ্রষ্টব্য: ভোটার তালিকায় আপনার নাম অবশ্যই থাকতে হবে।*",
            simple: "তোমার একটি বিশেষ কার্ড দরকার যাকে **ভোটার আইডি** বলে। \n\nযদি এটি হারিয়ে যায়, তুমি আধার কার্ডের মতো তোমার ছবিসহ অন্যান্য কার্ড দেখাতে পারো। তবে মনে রেখো, ভোটারদের বড় তালিকায় তোমার নাম থাকতে হবে!"
        },
        suggestions: ["I lost my voter ID", "How do I vote for the first time?"]
    },
    "evm": {
        en: {
            normal: "EVM stands for **Electronic Voting Machine**.\n\nIt is a simple electronic device used to record votes instead of ballot papers. \n\n**How it works:**\n1. The machine shows the names and symbols of candidates.\n2. You press the blue button next to your chosen candidate.\n3. A red light flashes and you hear a long beep sound confirming your vote is cast.\n\nIt also has a VVPAT (printer) that shows a paper slip for 7 seconds so you can verify your vote.",
            simple: "EVM is like a large calculator with buttons. \n\nInstead of writing on paper, you just press the button next to the picture of the person you want to vote for. It beeps to say 'Thank you, I got your vote!'"
        },
        bn: {
            normal: "EVM এর অর্থ **ইলেকট্রনিক ভোটিং মেশিন**।\n\nএটি ব্যালট পেপারের পরিবর্তে ভোট রেকর্ড করতে ব্যবহৃত একটি সাধারণ ইলেকট্রনিক ডিভাইস।\n\n**এটি কীভাবে কাজ করে:**\n১. মেশিনটি প্রার্থীদের নাম এবং প্রতীক দেখায়।\n২. আপনি আপনার নির্বাচিত প্রার্থীর পাশের নীল বোতাম টিপুন।\n৩. একটি লাল আলো জ্বলে এবং আপনি একটি দীর্ঘ বিপ শব্দ শুনতে পান যা নিশ্চিত করে যে আপনার ভোট দেওয়া হয়েছে।\n\nএটিতে একটি ভিভিপিএটি (প্রিন্টার) রয়েছে যা ৭ সেকেন্ডের জন্য একটি কাগজের স্লিপ দেখায় যাতে আপনি আপনার ভোট যাচাই করতে পারেন।",
            simple: "ইভিএম হলো বোতাম সহ একটি বড় ক্যালকুলেটরের মতো। \n\nকাগজে লেখার পরিবর্তে, তুমি শুধু তুমি যাকে ভোট দিতে চাও তার ছবির পাশের বোতামটি টিপো। এটি বিপ শব্দ করে বলে 'ধন্যবাদ, আমি তোমার ভোট পেয়েছি!'"
        },
        suggestions: ["What happens on voting day?", "Show myths vs facts about voting"]
    },
    "myth": {
        en: {
            normal: "Here are some common voting myths debunked:\n\n<div class='myth-fact myth'>❌ <strong>Myth:</strong> You have to pay a fee to register to vote.</div>\n<div class='myth-fact fact'>✅ <strong>Fact:</strong> Voter registration and voting are absolutely FREE.</div>\n\n<div class='myth-fact myth'>❌ <strong>Myth:</strong> I can vote online from my phone.</div>\n<div class='myth-fact fact'>✅ <strong>Fact:</strong> Currently, you must visit the polling booth in person to cast your vote using the EVM.</div>",
            simple: "Let's clear some confusion!\n\n❌ **Wrong:** You need money to vote.\n✅ **Right:** Voting is completely free! You don't pay anything.\n\n❌ **Wrong:** I can vote from my mobile phone.\n✅ **Right:** You have to walk to the voting center to press the button."
        },
        bn: {
            normal: "এখানে কিছু সাধারণ ভোটের ভুল ধারণা দূর করা হলো:\n\n<div class='myth-fact myth'>❌ <strong>ভুল ধারণা:</strong> ভোট দেওয়ার জন্য নিবন্ধন করতে ফি দিতে হয়।</div>\n<div class='myth-fact fact'>✅ <strong>আসল তথ্য:</strong> ভোটার নিবন্ধন এবং ভোট দেওয়া সম্পূর্ণ বিনামূল্যে।</div>\n\n<div class='myth-fact myth'>❌ <strong>ভুল ধারণা:</strong> আমি আমার ফোন থেকে অনলাইনে ভোট দিতে পারি।</div>\n<div class='myth-fact fact'>✅ <strong>আসল তথ্য:</strong> বর্তমানে, ইভিএম ব্যবহার করে ভোট দেওয়ার জন্য আপনাকে ব্যক্তিগতভাবে ভোটকেন্দ্রে যেতে হবে।</div>",
            simple: "চলো কিছু বিভ্রান্তি দূর করি!\n\n❌ **ভুল:** ভোট দিতে টাকা লাগে।\n✅ **সঠিক:** ভোট দেওয়া সম্পূর্ণ বিনামূল্যে! তুমি কিছুই দাও না।\n\n❌ **ভুল:** আমি আমার মোবাইল ফোন থেকে ভোট দিতে পারি।\n✅ **সঠিক:** বোতাম টিপতে তোমাকে ভোটকেন্দ্রে হেঁটে যেতে হবে।"
        },
        suggestions: ["What is EVM?", "How do I vote for the first time?"]
    },
    "lost": {
        en: {
            normal: "Don't panic if you lost your Voter ID card!\n\n**You can still vote if your name is on the voter list.**\nJust take another valid photo ID like:\n- Aadhaar Card\n- PAN Card\n- Passport\n- Driving License\n\nTo get a duplicate Voter ID, you can apply online through the NVSP portal.",
            simple: "Don't worry! If you lost your voting card, you can still vote.\n\nJust make sure your name is on the list at the center, and show them another card with your photo, like an Aadhaar card."
        },
        bn: {
            normal: "আপনার ভোটার আইডি কার্ড হারিয়ে গেলে আতঙ্কিত হবেন না!\n\n**ভোটার তালিকায় আপনার নাম থাকলে আপনি এখনও ভোট দিতে পারবেন।**\nশুধু অন্য একটি বৈধ ফটো আইডি নিয়ে যান যেমন:\n- আধার কার্ড\n- প্যান কার্ড\n- পাসপোর্ট\n- ড্রাইভিং লাইসেন্স\n\nডুপ্লিকেট ভোটার আইডির জন্য, আপনি এনভিএসপি পোর্টালের মাধ্যমে অনলাইনে আবেদন করতে পারেন।",
            simple: "চিন্তা কোরো না! যদি তুমি তোমার ভোটিং কার্ড হারিয়ে ফেলো, তবুও তুমি ভোট দিতে পারো।\n\nশুধু নিশ্চিত করো যে কেন্দ্রে তালিকায় তোমার নাম আছে, এবং তাদের তোমার ছবিসহ অন্য একটি কার্ড দেখাও, যেমন আধার কার্ড।"
        },
        suggestions: ["What documents do I need to vote?", "How do I vote for the first time?"]
    },
     "moved": {
        en: {
            normal: "If you have shifted your residence:\n\n**Within the same constituency:** Submit Form 8 to update your address.\n**To a different constituency:** Submit Form 6 to register as a new voter at your new address.\n\nYou can do this online on the Voter's Services Portal. Your old entry will be automatically deleted.",
            simple: "If you moved to a new house:\n\nIf it's nearby, you just fill out a small form to change your address.\nIf you moved far away to a new city, you have to register again as a new voter there. You can do it on the computer!"
        },
        bn: {
            normal: "আপনি যদি আপনার বাসস্থান পরিবর্তন করে থাকেন:\n\n**একই নির্বাচনী এলাকার মধ্যে:** আপনার ঠিকানা আপডেট করতে ফর্ম ৮ জমা দিন।\n**অন্য নির্বাচনী এলাকায়:** আপনার নতুন ঠিকানায় নতুন ভোটার হিসেবে নিবন্ধন করতে ফর্ম ৬ জমা দিন।\n\nআপনি ভোটার সার্ভিস পোর্টালে অনলাইনে এটি করতে পারেন। আপনার পুরানো এন্ট্রি স্বয়ংক্রিয়ভাবে মুছে ফেলা হবে।",
            simple: "তুমি যদি নতুন বাড়িতে যাও:\n\nযদি এটি কাছাকাছি হয়, তবে তুমি তোমার ঠিকানা পরিবর্তন করার জন্য একটি ছোট ফর্ম পূরণ করো।\nযদি তুমি অনেক দূরে একটি নতুন শহরে যাও, তবে তোমাকে সেখানে নতুন ভোটার হিসাবে আবার নিবন্ধন করতে হবে। তুমি এটি কম্পিউটারে করতে পারো!"
        },
        suggestions: ["How does voter registration work?", "What documents do I need to vote?"]
    },
    "registration": {
        en: {
            normal: "Here is how Voter Registration works:\n\n<div class='step'><div class='step-num'>1</div><div>Go to the Voter Service Portal (voters.eci.gov.in) or use the Voter Helpline App.</div></div>\n<div class='step'><div class='step-num'>2</div><div>Fill out **Form 6** for new voter registration.</div></div>\n<div class='step'><div class='step-num'>3</div><div>Upload a passport-size photo and proof of age & address (like Aadhaar).</div></div>\n<div class='step'><div class='step-num'>4</div><div>Submit! You will get a reference number to track your status.</div></div>",
            simple: "Registering to vote is easy!\n\n1. Go online or use a mobile app.\n2. Fill out a form saying who you are and where you live.\n3. Show them a picture of yourself and a document like Aadhaar.\n4. Submit it, and they will send your Voter ID to your house!"
        },
        bn: {
            normal: "ভোটার নিবন্ধন কীভাবে কাজ করে তা এখানে দেওয়া হলো:\n\n<div class='step'><div class='step-num'>1</div><div>ভোটার সার্ভিস পোর্টালে (voters.eci.gov.in) যান বা ভোটার হেল্পলাইন অ্যাপ ব্যবহার করুন।</div></div>\n<div class='step'><div class='step-num'>2</div><div>নতুন ভোটার নিবন্ধনের জন্য **ফর্ম ৬** পূরণ করুন।</div></div>\n<div class='step'><div class='step-num'>3</div><div>একটি পাসপোর্ট সাইজের ছবি এবং বয়স ও ঠিকানার প্রমাণ (যেমন আধার) আপলোড করুন।</div></div>\n<div class='step'><div class='step-num'>4</div><div>জমা দিন! আপনি আপনার স্থিতি ট্র্যাক করতে একটি রেফারেন্স নম্বর পাবেন।</div></div>",
            simple: "ভোট দেওয়ার জন্য নিবন্ধন করা সহজ!\n\n১. অনলাইনে যান বা একটি মোবাইল অ্যাপ ব্যবহার করুন।\n২. আপনি কে এবং কোথায় থাকেন তা জানিয়ে একটি ফর্ম পূরণ করুন।\n৩. তাদের নিজের একটি ছবি এবং আধারের মতো একটি নথি দেখান।\n৪. এটি জমা দিন, এবং তারা আপনার ভোটার আইডি আপনার বাড়িতে পাঠাবে!"
        },
        suggestions: ["What documents do I need to vote?", "How do I vote for the first time?"]
    },
    "day": {
        en: {
            normal: "Here is the Voting Day Process:\n\n<div class='step'><div class='step-num'>1</div><div>**Entry:** Enter the polling booth and show your ID to the officer.</div></div>\n<div class='step'><div class='step-num'>2</div><div>**Verification:** The officer checks your name on the list.</div></div>\n<div class='step'><div class='step-num'>3</div><div>**Marking:** An ink mark is put on your finger, and you sign the register.</div></div>\n<div class='step'><div class='step-num'>4</div><div>**Voting:** Go to the EVM compartment, press the button for your candidate, and check the printed slip (VVPAT).</div></div>",
            simple: "On voting day:\n\n1. You go to the voting room and show your ID.\n2. They check your name and put a small ink mark on your finger.\n3. You go behind a screen, press the button on the machine, and you're done!"
        },
        bn: {
            normal: "ভোটের দিনের প্রক্রিয়াটি এখানে দেওয়া হলো:\n\n<div class='step'><div class='step-num'>1</div><div>**প্রবেশ:** ভোটকেন্দ্রে প্রবেশ করুন এবং অফিসারকে আপনার আইডি দেখান।</div></div>\n<div class='step'><div class='step-num'>2</div><div>**যাচাইকরণ:** অফিসার তালিকায় আপনার নাম পরীক্ষা করেন।</div></div>\n<div class='step'><div class='step-num'>3</div><div>**চিহ্নিতকরণ:** আপনার আঙুলে কালির দাগ দেওয়া হয় এবং আপনি রেজিস্টারে স্বাক্ষর করেন।</div></div>\n<div class='step'><div class='step-num'>4</div><div>**ভোট দেওয়া:** ইভিএম কম্পার্টমেন্টে যান, আপনার প্রার্থীর জন্য বোতাম টিপুন এবং মুদ্রিত স্লিপ (ভিভিপিএটি) পরীক্ষা করুন।</div></div>",
            simple: "ভোটের দিন:\n\n১. তুমি ভোটিং রুমে গিয়ে তোমার আইডি দেখাও।\n২. তারা তোমার নাম পরীক্ষা করে এবং তোমার আঙুলে একটি ছোট কালির দাগ দেয়।\n৩. তুমি একটি পর্দার পিছনে গিয়ে মেশিনের বোতাম টিপো, এবং তোমার কাজ শেষ!"
        },
         suggestions: ["What is EVM?", "How are votes counted?"]
    },
    "counted": {
        en: {
            normal: "Result Counting Process:\n\n1. After voting ends, EVMs are sealed and stored in secure strong rooms under guard.\n2. On counting day, officials open the EVMs in the presence of candidates.\n3. They press the 'Result' button on the Control Unit, which shows the total votes for each candidate.\n4. The candidate with the most votes in the constituency wins!",
            simple: "After everyone votes:\n\n1. The voting machines are locked safely in a strong room.\n2. On counting day, officials unlock them.\n3. The machine quickly calculates who got how many votes.\n4. The person with the highest number wins!"
        },
        bn: {
            normal: "ফলাফল গণনার প্রক্রিয়া:\n\n১. ভোট গ্রহণ শেষ হওয়ার পরে, ইভিএমগুলি সিল করা হয় এবং পাহারায় সুরক্ষিত স্ট্রং রুমে সংরক্ষণ করা হয়।\n২. গণনার দিন, কর্মকর্তারা প্রার্থীদের উপস্থিতিতে ইভিএম খোলেন।\n৩. তারা কন্ট্রোল ইউনিটের 'ফলাফল' বোতাম টিপেন, যা প্রতিটি প্রার্থীর জন্য মোট ভোট দেখায়।\n৪. নির্বাচনী এলাকায় সর্বাধিক ভোট পাওয়া প্রার্থী বিজয়ী হন!",
            simple: "সবাই ভোট দেওয়ার পরে:\n\n১. ভোটিং মেশিনগুলি একটি শক্ত ঘরে নিরাপদে তালাবদ্ধ থাকে।\n২. গণনার দিন, কর্মকর্তারা সেগুলোর তালা খোলেন।\n৩. কে কত ভোট পেয়েছে তা মেশিনটি দ্রুত গণনা করে।\n৪. যে ব্যক্তির সংখ্যা সবচেয়ে বেশি সে জয়ী হয়!"
        },
         suggestions: ["Explain the election timeline", "What happens on voting day?"]
    },
    "greeting": {
        en: {
            normal: "Hello there! 👋 I am **VoteBuddy AI**, your personal election guide.\n\nI can help you understand the election process, required documents, or how EVMs work. What would you like to know today?",
            simple: "Hi! 👋 I am **VoteBuddy**, your friendly election helper!\n\nI can tell you how voting works in a very simple way. Do you want to know how to vote for the first time?"
        },
        bn: {
            normal: "হ্যালো! 👋 আমি **ভোটবাডি এআই**, আপনার ব্যক্তিগত নির্বাচন গাইড।\n\nআমি আপনাকে নির্বাচন প্রক্রিয়া, প্রয়োজনীয় নথিপত্র বা ইভিএম কীভাবে কাজ করে তা বুঝতে সাহায্য করতে পারি। আপনি আজ কী জানতে চান?",
            simple: "হাই! 👋 আমি **ভোটবাডি**, আপনার বন্ধুত্বপূর্ণ নির্বাচন সহায়ক!\n\nভোট কীভাবে কাজ করে তা আমি আপনাকে খুব সহজ উপায়ে বলতে পারি। আপনি কি জানতে চান কীভাবে প্রথমবারের মতো ভোট দিতে হয়?"
        },
        suggestions: ["How do I vote for the first time?", "What is EVM?"]
    },
    "pwd": {
        en: {
            normal: "The Election Commission provides special facilities for Persons with Disabilities (PwD) and Senior Citizens:\n\n- Wheelchairs and ramps at all polling booths.\n- Priority voting (no need to stand in lines).\n- Free transport facility (can be booked via the Saksham App).\n- EVMs with Braille features for visually impaired voters.\n- Home voting facility (using Form 12D) for voters aged 85+ or with 40%+ disability.",
            simple: "If someone is old or has trouble walking or seeing, they get special help!\n\n1. They don't have to wait in lines.\n2. There are wheelchairs to help them move.\n3. The voting machine has special bumps (Braille) so blind people can feel the buttons.\n4. Sometimes, officers even go to their homes so they can vote from bed!"
        },
        bn: {
            normal: "নির্বাচন কমিশন প্রতিবন্ধী ব্যক্তিদের (PwD) এবং প্রবীণ নাগরিকদের জন্য বিশেষ সুবিধা প্রদান করে:\n\n- সমস্ত ভোটকেন্দ্রে হুইলচেয়ার এবং র্যাম্প।\n- অগ্রাধিকার ভিত্তিতে ভোটদান (লাইনে দাঁড়ানোর প্রয়োজন নেই)।\n- বিনামূল্যের পরিবহন সুবিধা (সক্ষম অ্যাপের মাধ্যমে বুক করা যেতে পারে)।\n- দৃষ্টিহীন ভোটারদের জন্য ব্রেইল বৈশিষ্ট্যযুক্ত ইভিএম।\n- ৮৫+ বয়সী বা ৪০%+ প্রতিবন্ধী ভোটারদের জন্য হোম ভোটিং সুবিধা (ফর্ম 12D ব্যবহার করে)।",
            simple: "যদি কেউ বয়স্ক হন বা হাঁটাচলা বা দেখতে সমস্যা হয়, তবে তারা বিশেষ সাহায্য পান!\n\n১. তাদের লাইনে অপেক্ষা করতে হয় না।\n২. তাদের চলাচলের জন্য হুইলচেয়ার থাকে।\n৩. ভোটিং মেশিনে বিশেষ উঁচু অংশ (ব্রেইল) থাকে যাতে অন্ধ ব্যক্তিরা বোতামগুলো অনুভব করতে পারেন।\n৪. কখনও কখনও, কর্মকর্তারা তাদের বাড়িতে যান যাতে তারা বিছানা থেকে ভোট দিতে পারেন!"
        },
        suggestions: ["How do I vote for the first time?", "Find my polling booth"]
    },
    "nri": {
        en: {
            normal: "Overseas Indian citizens (NRIs) can register to vote!\n\nTo register, you must fill out **Form 6A** on the Voter Portal. \n\n*Note:* Currently, NRIs cannot vote online or by post. You must be physically present at your designated polling booth in India on election day with your original Passport.",
            simple: "If you are an Indian living in another country, you can still vote!\n\nYou just fill out a special form online (Form 6A). But, to actually vote, you have to travel back to India on voting day and show your passport."
        },
        bn: {
            normal: "প্রবাসী ভারতীয় নাগরিকরা (এনআরআই) ভোট দেওয়ার জন্য নিবন্ধন করতে পারেন!\n\nনিবন্ধন করতে, আপনাকে ভোটার পোর্টালে **ফর্ম 6A** পূরণ করতে হবে।\n\n*দ্রষ্টব্য:* বর্তমানে, এনআরআইরা অনলাইনে বা ডাকযোগে ভোট দিতে পারবেন না। নির্বাচনের দিন আপনার আসল পাসপোর্ট নিয়ে আপনাকে ভারতের নির্ধারিত ভোটকেন্দ্রে শারীরিকভাবে উপস্থিত থাকতে হবে।",
            simple: "আপনি যদি অন্য দেশে বসবাসকারী ভারতীয় হন, তবুও আপনি ভোট দিতে পারবেন!\n\nআপনাকে শুধু অনলাইনে একটি বিশেষ ফর্ম (ফর্ম 6A) পূরণ করতে হবে। তবে, আসলে ভোট দেওয়ার জন্য, আপনাকে ভোটের দিন ভারতে ফিরে যেতে হবে এবং আপনার পাসপোর্ট দেখাতে হবে।"
        },
        suggestions: ["Find my polling booth", "What documents do I need to vote?"]
    },
    "location": {
        en: {
            normal: "To find your specific Polling Booth or State rules:\n\n1. Visit the **Voter Service Portal (voters.eci.gov.in)** and click 'Search in Electoral Roll'.\n2. Or, download the **Voter Helpline App**.\n3. You can also SMS `<ECIPS> <EPIC Number>` to **1950**.\n\nEach state has its own Chief Electoral Officer (CEO) website for local guidelines.",
            simple: "To find exactly which school or building you need to go to vote:\n\nYou or your parents can check on the government's Voter website, use the Voter App on a phone, or just send a quick SMS to the number 1950!"
        },
        bn: {
            normal: "আপনার নির্দিষ্ট ভোটকেন্দ্র বা রাজ্যের নিয়মাবলী খুঁজতে:\n\n১. **ভোটার সার্ভিস পোর্টালে (voters.eci.gov.in)** যান এবং 'Search in Electoral Roll'-এ ক্লিক করুন।\n২. অথবা, **ভোটার হেল্পলাইন অ্যাপ** ডাউনলোড করুন।\n৩. আপনি **1950** নম্বরে `<ECIPS> <EPIC Number>` লিখে SMS-ও করতে পারেন।\n\nস্থানীয় নির্দেশিকার জন্য প্রতিটি রাজ্যের নিজস্ব মুখ্য নির্বাচনী কর্মকর্তা (CEO) ওয়েবসাইট রয়েছে।",
            simple: "ভোট দেওয়ার জন্য আপনাকে ঠিক কোন স্কুল বা ভবনে যেতে হবে তা খুঁজতে:\n\nআপনি বা আপনার বাবা-মা সরকারের ভোটার ওয়েবসাইটে চেক করতে পারেন, ফোনে ভোটার অ্যাপ ব্যবহার করতে পারেন, অথবা 1950 নম্বরে একটি দ্রুত এসএমএস পাঠাতে পারেন!"
        },
        suggestions: ["What happens on voting day?", "How do I vote for the first time?"]
    }
};

// --- DOM Elements ---
const DOM = {
    chatArea: document.getElementById('chatArea'),
    messagesContainer: document.getElementById('messagesContainer'),
    userInput: document.getElementById('userInput'),
    sendBtn: document.getElementById('sendBtn'),
    typingIndicator: document.getElementById('typingIndicator'),
    welcomeCard: document.getElementById('welcomeCard'),
    
    // Toggles
    langEn: document.getElementById('langEn'),
    langBn: document.getElementById('langBn'),
    modeNormal: document.getElementById('modeNormal'),
    modeSimple: document.getElementById('modeSimple'),
    
    // Sidebar
    sidebar: document.getElementById('sidebar'),
    menuBtn: document.getElementById('menuBtn'),
    sidebarClose: document.getElementById('sidebarClose'),
    clearChat: document.getElementById('clearChat'),
    
    // Modals
    quizModal: document.getElementById('quizModal'),
    checklistModal: document.getElementById('checklistModal'),
    journeyModal: document.getElementById('journeyModal'),
    quizClose: document.getElementById('quizClose'),
    checklistClose: document.getElementById('checklistClose'),
    journeyClose: document.getElementById('journeyClose')
};

// --- Event Listeners ---
document.addEventListener('DOMContentLoaded', init);

function init() {
    // Input handling
    DOM.sendBtn.addEventListener('click', handleSend);
    DOM.userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    });

    // Auto-resize textarea
    DOM.userInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });

    // Language Toggle
    DOM.langEn.addEventListener('click', () => setLang('en'));
    DOM.langBn.addEventListener('click', () => setLang('bn'));

    // Mode Toggle
    DOM.modeNormal.addEventListener('click', () => setMode('normal'));
    DOM.modeSimple.addEventListener('click', () => setMode('simple'));

    // Mobile Sidebar
    DOM.menuBtn.addEventListener('click', () => DOM.sidebar.classList.add('open'));
    DOM.sidebarClose.addEventListener('click', () => DOM.sidebar.classList.remove('open'));

    // Clear Chat
    DOM.clearChat.addEventListener('click', () => {
        DOM.messagesContainer.innerHTML = '';
        DOM.welcomeCard.classList.remove('hidden');
    });

    // Action Buttons (Chips & Sidebar)
    document.querySelectorAll('.action-btn, .chip').forEach(btn => {
        btn.addEventListener('click', () => {
            const query = btn.getAttribute('data-query');
            if (query) {
                if (window.innerWidth <= 768) DOM.sidebar.classList.remove('open');
                processQuery(query);
            }
        });
    });

    // Modal Triggers
    document.getElementById('startQuiz').addEventListener('click', openQuiz);
    document.getElementById('openChecklist').addEventListener('click', openChecklist);
    document.getElementById('startJourney').addEventListener('click', openJourney);

    // Modal Close Buttons
    DOM.quizClose.addEventListener('click', () => DOM.quizModal.classList.remove('active'));
    DOM.checklistClose.addEventListener('click', () => DOM.checklistModal.classList.remove('active'));
    DOM.journeyClose.addEventListener('click', () => DOM.journeyModal.classList.remove('active'));
    
    // Close modal on outside click
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
    });

    updateUIStrings();
}

// --- Logic Functions ---

function setLang(lang) {
    currentLang = lang;
    DOM.langEn.classList.toggle('active', lang === 'en');
    DOM.langBn.classList.toggle('active', lang === 'bn');
    updateUIStrings();
}

function setMode(mode) {
    currentMode = mode;
    DOM.modeNormal.classList.toggle('active', mode === 'normal');
    DOM.modeSimple.classList.toggle('active', mode === 'simple');
}

function updateUIStrings() {
    const t = i18n[currentLang];
    document.querySelector('.welcome-card h1').textContent = t.welcomeTitle;
    document.querySelector('.welcome-card > p').textContent = t.welcomeSubtitle;
    DOM.userInput.placeholder = t.placeholder;
    // For a real app, you'd update all sidebar items and static text here based on data-i18n attributes
}

function handleSend() {
    const text = DOM.userInput.value.trim();
    if (!text) return;

    // Reset input
    DOM.userInput.value = '';
    DOM.userInput.style.height = 'auto';

    processQuery(text);
}

function processQuery(query) {
    // Hide welcome card
    DOM.welcomeCard.classList.add('hidden');

    // Add user message
    appendMessage(query, 'user');

    // Show typing
    DOM.typingIndicator.classList.add('active');
    scrollToBottom();

    // Match query (simulate AI delay)
    setTimeout(() => {
        const responseData = matchQuery(query);
        DOM.typingIndicator.classList.remove('active');
        
        appendMessage(responseData.text, 'bot', responseData.suggestions);
    }, 1000);
}

function matchQuery(query) {
    // Normalize string: lowercase and remove extra spaces/punctuation for better matching
    const normalizedQuery = query.toLowerCase().replace(/[^\w\s\u0980-\u09FF]/gi, '').trim().replace(/\s+/g, ' ');
    
    // Multilingual command switch
    if (normalizedQuery.includes("bengali") || query.includes("বাংলা")) {
        setLang('bn');
        return { text: "আমি এখন বাংলায় কথা বলছি। আমি কীভাবে আপনাকে সাহায্য করতে পারি?", suggestions: ["আমি কীভাবে প্রথমবারের মতো ভোট দেব?", "ইভিএম কী?"] };
    }
    if (normalizedQuery.includes("english")) {
        setLang('en');
        return { text: "I am now speaking in English. How can I help you?", suggestions: ["How do I vote for the first time?", "What is EVM?"] };
    }
    
    // Greetings matching
    const greetings = ['hi', 'hello', 'hey', 'whats up', 'what is your name', 'whats your name', 'who are you', 'হ্যালো', 'হাই'];
    if (greetings.some(g => normalizedQuery === g || normalizedQuery.startsWith(g + ' ') || normalizedQuery.endsWith(' ' + g))) {
        return getKBData('greeting');
    }
    
    // Keyword matching
    if (normalizedQuery.includes('first time') || normalizedQuery.includes('how to vote') || query.includes('প্রথমবার')) return getKBData('first time');
    if (normalizedQuery.includes('timeline') || query.includes('সময়রেখা') || normalizedQuery.includes('when')) return getKBData('timeline');
    if (normalizedQuery.includes('document') || normalizedQuery.includes('id') || query.includes('নথি')) {
        if(normalizedQuery.includes('lost') || query.includes('হারিয়ে')) return getKBData('lost');
        return getKBData('document');
    }
    if (normalizedQuery.includes('evm') || normalizedQuery.includes('machine') || query.includes('ইভিএম')) return getKBData('evm');
    if (normalizedQuery.includes('myth') || normalizedQuery.includes('fact') || query.includes('মিথ')) return getKBData('myth');
    if (normalizedQuery.includes('moved') || normalizedQuery.includes('shift') || query.includes('পরিবর্তন')) return getKBData('moved');
    if (normalizedQuery.includes('register') || normalizedQuery.includes('registration') || query.includes('নিবন্ধন')) return getKBData('registration');
    if (normalizedQuery.includes('day') || normalizedQuery.includes('process') || query.includes('দিন')) return getKBData('day');
    if (normalizedQuery.includes('count') || normalizedQuery.includes('result') || query.includes('গণনা')) return getKBData('counted');
    if (normalizedQuery.includes('pwd') || normalizedQuery.includes('disabled') || normalizedQuery.includes('wheelchair') || query.includes('প্রতিবন্ধী')) return getKBData('pwd');
    if (normalizedQuery.includes('nri') || normalizedQuery.includes('overseas') || query.includes('প্রবাসী')) return getKBData('nri');
    if (normalizedQuery.includes('location') || normalizedQuery.includes('booth') || normalizedQuery.includes('state') || normalizedQuery.includes('where') || query.includes('কোথায়') || query.includes('কেন্দ্র')) return getKBData('location');

    // Default fallback
    return {
        text: i18n[currentLang].didYouMean,
        suggestions: ["How do I vote for the first time?", "Explain the election timeline", "What documents do I need to vote?"]
    };
}

function getKBData(key) {
    const data = knowledgeBase[key];
    const text = data[currentLang][currentMode];
    return {
        text: text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>'),
        suggestions: data.suggestions
    };
}

function appendMessage(text, sender, suggestions = []) {
    const div = document.createElement('div');
    div.className = `message ${sender}`;
    
    const avatar = sender === 'bot' ? '🤖' : '👤';
    
    let contentHtml = `<div class="msg-avatar">${avatar}</div><div class="msg-bubble">${text}`;
    
    if (sender === 'bot') {
        const plainText = text.replace(/<[^>]*>?/gm, '').replace(/"/g, '&quot;');
        contentHtml += `<button class="tts-btn" onclick="speakText(this, \`${plainText}\`)" aria-label="Read aloud" title="Read aloud">🔊</button>`;
    }
    
    if (suggestions && suggestions.length > 0 && sender === 'bot') {
        contentHtml += `<div class="follow-up-chips">`;
        suggestions.forEach(s => {
            contentHtml += `<button class="follow-up-chip" onclick="processQuery('${s}')">${s}</button>`;
        });
        contentHtml += `</div>`;
    }
    
    contentHtml += `</div>`;
    div.innerHTML = contentHtml;
    
    DOM.messagesContainer.appendChild(div);
    scrollToBottom();
}

function speakText(btn, text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        
        if (btn.classList.contains('speaking')) {
            document.querySelectorAll('.tts-btn').forEach(b => b.classList.remove('speaking'));
            return;
        }

        document.querySelectorAll('.tts-btn').forEach(b => b.classList.remove('speaking'));
        btn.classList.add('speaking');

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = currentLang === 'bn' ? 'bn-IN' : 'en-IN';
        utterance.rate = 0.95;
        
        utterance.onend = () => btn.classList.remove('speaking');
        utterance.onerror = () => btn.classList.remove('speaking');
        
        window.speechSynthesis.speak(utterance);
    } else {
        alert("Sorry, your browser doesn't support text-to-speech.");
    }
}

function scrollToBottom() {
    DOM.chatArea.scrollTop = DOM.chatArea.scrollHeight;
}

// --- Modals Logic ---

// Quiz Data
const quizQuestions = [
    { q: "What is the minimum age to vote in India?", options: ["16 years", "18 years", "21 years"], correct: 1 },
    { q: "Which document is primarily used for voting?", options: ["PAN Card", "Voter ID (EPIC)", "Ration Card"], correct: 1 },
    { q: "What does EVM stand for?", options: ["Electronic Voting Machine", "Electrical Voting Module", "Election Vote Monitor"], correct: 0 },
    { q: "Is voting completely free?", options: ["Yes", "No, there is a small fee"], correct: 0 }
];

let currentQuizIndex = 0;
let quizScore = 0;

function openQuiz() {
    if (window.innerWidth <= 768) DOM.sidebar.classList.remove('open');
    DOM.quizModal.classList.add('active');
    currentQuizIndex = 0;
    quizScore = 0;
    renderQuiz();
}

function renderQuiz() {
    const body = document.getElementById('quizBody');
    const result = document.getElementById('quizResult');
    const qCount = document.getElementById('quizCounter');
    const pBar = document.getElementById('quizProgressBar');
    
    if (currentQuizIndex < quizQuestions.length) {
        body.style.display = 'block';
        result.style.display = 'none';
        
        const q = quizQuestions[currentQuizIndex];
        qCount.textContent = `Question ${currentQuizIndex + 1} of ${quizQuestions.length}`;
        pBar.style.width = `${((currentQuizIndex) / quizQuestions.length) * 100}%`;
        
        let html = `<div class="quiz-question">${q.q}</div><div class="quiz-options">`;
        q.options.forEach((opt, idx) => {
            html += `<button class="quiz-option" onclick="handleQuizAnswer(${idx})">${opt}</button>`;
        });
        html += `</div>`;
        body.innerHTML = html;
    } else {
        // Show Results
        body.style.display = 'none';
        result.style.display = 'block';
        pBar.style.width = '100%';
        
        let msg = quizScore === quizQuestions.length ? "Perfect! You are fully prepared to vote." : "Good job! Review the topics to learn more.";
        result.innerHTML = `
            <div class="quiz-result-card">
                <div class="quiz-score">${quizScore}/${quizQuestions.length}</div>
                <div class="quiz-feedback">${msg}</div>
                <button class="quiz-retry" onclick="openQuiz()">Try Again</button>
            </div>
        `;
    }
}

window.handleQuizAnswer = function(idx) {
    const q = quizQuestions[currentQuizIndex];
    const opts = document.querySelectorAll('.quiz-option');
    
    // Disable clicks
    opts.forEach(opt => opt.style.pointerEvents = 'none');
    
    if (idx === q.correct) {
        opts[idx].classList.add('correct');
        quizScore++;
    } else {
        opts[idx].classList.add('wrong');
        opts[q.correct].classList.add('correct');
    }
    
    setTimeout(() => {
        currentQuizIndex++;
        renderQuiz();
    }, 1000);
};

// Checklist Logic
function openChecklist() {
    if (window.innerWidth <= 768) DOM.sidebar.classList.remove('open');
    DOM.checklistModal.classList.add('active');
    renderChecklist();
}

function renderChecklist() {
    const body = document.getElementById('checklistBody');
    const items = [
        { id: 'step1', label: 'Register to vote online (Form 6)' },
        { id: 'step2', label: 'Receive Voter ID (EPIC) card' },
        { id: 'step3', label: 'Check name in Electoral Roll' },
        { id: 'step4', label: 'Locate polling booth' }
    ];
    
    let html = '';
    let completed = 0;
    
    items.forEach(item => {
        const isChecked = checklistData[item.id];
        if (isChecked) completed++;
        html += `
            <div class="checklist-item ${isChecked ? 'checked' : ''}" onclick="toggleChecklist('${item.id}')">
                <div class="checklist-check">${isChecked ? '✓' : ''}</div>
                <div class="checklist-label">${item.label}</div>
            </div>
        `;
    });
    
    body.innerHTML = html;
    
    const percent = Math.round((completed / items.length) * 100);
    document.getElementById('checklistProgressBar').style.width = `${percent}%`;
    document.getElementById('checklistPercent').textContent = `${percent}% Complete`;
}

window.toggleChecklist = function(id) {
    checklistData[id] = !checklistData[id];
    renderChecklist();
};

// Personalized Journey Logic
function openJourney() {
    if (window.innerWidth <= 768) DOM.sidebar.classList.remove('open');
    DOM.journeyModal.classList.add('active');
    
    const body = document.getElementById('journeyBody');
    body.innerHTML = `
        <div class="journey-question" id="jq1">
            <p>1. Are you a first-time voter?</p>
            <div class="journey-options">
                <button class="journey-opt" onclick="journeyStep1('yes')">Yes</button>
                <button class="journey-opt" onclick="journeyStep1('no')">No</button>
            </div>
        </div>
        <div id="journeyResult"></div>
    `;
}

window.journeyStep1 = function(ans) {
    const btns = document.querySelectorAll('#jq1 .journey-opt');
    btns[0].classList.toggle('selected', ans === 'yes');
    btns[1].classList.toggle('selected', ans === 'no');
    
    const isFirstTimer = ans === 'yes';
    
    document.getElementById('journeyResult').innerHTML = `
        <div class="journey-plan">
            <h3>Your Custom Action Plan</h3>
            <div class="journey-step">
                <div class="journey-step-num">1</div>
                <div class="journey-step-text">
                    <h4>${isFirstTimer ? 'Register Online' : 'Check Voter List'}</h4>
                    <p>${isFirstTimer ? 'Visit voters.eci.gov.in and fill Form 6.' : 'Verify your name is still active on the electoral roll.'}</p>
                </div>
            </div>
            <div class="journey-step">
                <div class="journey-step-num">2</div>
                <div class="journey-step-text">
                    <h4>Prepare Documents</h4>
                    <p>${isFirstTimer ? 'Keep Aadhaar and passport photo ready.' : 'Find your Voter ID (EPIC).'}</p>
                </div>
            </div>
            <button class="quiz-retry" style="width:100%" onclick="document.getElementById('journeyModal').classList.remove('active'); processQuery('${isFirstTimer ? 'How do I vote for the first time?' : 'What documents do I need?'}')">Ask VoteBuddy for details</button>
        </div>
    `;
};

