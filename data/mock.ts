import { Agreement, Post, Practice, Question, Profile } from "../types/state";

const profile: Profile = {
  user: {
    id: "1",
    name: "James",
    description: "Dad of 8 y/o boy",
    photo: "dad",
    expert: false,
  },
  role: "Dad",
};

const posts: Post[] = [
  {
    id: "1",
    title: "How do I get my infant to sleep?",
    author: {
      id: "2",
      name: "Monica",
      description: "Mother of 3 mo girl",
      photo: "monica",
      expert: false,
    },
    content:
      "My baby is crying at 4 am every day. This is crazy. Can anyone share any advice on forming a good sleeping schedule for babies? \nBonus: pic of my baby when she's sleeping!",
    image: "sleeping-baby",
    topics: ["anxiety", "bedtime"],
    likeCount: 63,
    likers: [],
    anonymous: false,
    expertsOnly: false,
    createdAt: "2022-03-02T02:42:34.871Z",
    updatedAt: "2022-03-02T02:42:34.871Z",
    replies: [
      {
        id: "1",
        author: {
          id: "3",
          name: "Dr. Smith",
          description: "Pediatrician",
          photo: "smith",
          expert: true,
        },
        content:
          "This is one of those parenting questions for new parents that are often perplexing because there is no precise answer. All babies have unique sleep patterns and reasons why they sleep how they do or why they have troubles. In fact, some babies even need a full year to develop a proper sleep cycle at night. To help them associate bed with sleep, put them in the crib when they are sleepy and not fully asleep. This helps build an association that is covered with a blanket means sleep time. You can begin their sleep training by the time they are 6 months old.",
        likeCount: 50,
        likers: [],
        createdAt: "2022-03-02T03:42:34.871Z",
        updatedAt: "2022-03-02T03:42:34.871Z",
      },
      {
        id: "2",
        author: {
          id: "4",
          name: "Selina",
          description: "Mother of 7 mo boy",
          photo: "selina",
          expert: false,
        },
        content:
          "I had the same problem during the first couple of months. It'll get better when you know the baby's schedule. Try documenting her cycle using a notebook or apps. It helped a lot cuz babies tended to keep the same schedule.",
        likeCount: 12,
        likers: [],
        createdAt: "2022-03-02T04:42:34.871Z",
        updatedAt: "2022-03-02T04:42:34.871Z",
      },
    ],
  },
  {
    id: "2",
    title: "What's the right age to allow my kids to date?",
    author: {
      id: "5",
      name: "Daniel",
      description: "Father of 10 y/o boy & 15 y/o girl",
      photo: "daniel",
      expert: false,
    },
    content:
      "Hi, my boy said she had a crush on a classmate, which is definitely normal. But he's only 10, so I'm a bit concerned if he's too young to start dating? 😂😂😂",
    image: null,
    topics: ["love"],
    likeCount: 43,
    likers: [],
    anonymous: false,
    expertsOnly: false,
    createdAt: "2022-03-01T02:42:34.871Z",
    updatedAt: "2022-03-01T02:42:34.871Z",
    replies: [
      {
        id: "3",
        author: {
          id: "6",
          name: "Kathy",
          description: "Middle school teacher, mother of 15 y/o boy",
          photo: "kathy",
          expert: true,
        },
        content:
          "The term dating has evolved quite a bit from what it used to be due to technology that allows instant contact through messengers and video calls. Sometimes even kids as young as fifth grade believe they're dating someone when all they're really doing is text a lot. It's hard to assign an age as the right start for dating as different kids mature emotionally at different ages, and it is up to you to explain to them the differences between close friendships and romance. With an open dialogue, you can both arrive organically when your kid is ready to go out with someone.",
        likeCount: 23,
        likers: [],
        createdAt: "2022-03-01T03:42:34.871Z",
        updatedAt: "2022-03-01T03:42:34.871Z",
      },
      {
        id: "4",
        author: {
          id: "7",
          name: "Emily",
          description: "Mother of 15 y/o girl",
          photo: "emily",
          expert: false,
        },
        content:
          "I know my girl is dating now. Not sure if she dated someone else before. I think most kids would start dating in their teenage years. I would suggest you keep an eye on their mental health and have an open chat about sex education so that they would know how to protect themselves, especially for girls. As long as they are happy and healthy, I wouldn't be too concerned.",
        likeCount: 15,
        likers: [],
        createdAt: "2022-03-01T04:42:34.871Z",
        updatedAt: "2022-03-01T04:42:34.871Z",
      },
    ],
  },
  {
    id: "3",
    title: "My child is being bullied by his peers. What can I do?",
    author: {
      id: "8",
      name: "Ted",
      description: "Father of 8 y/o boy",
      photo: "ted",
      expert: false,
    },
    content:
      "Teacher just sent my little boy home. He is bullied at school because of his race. He's the only minority in his class. How should I fight back? We've brought it up to the school principal multiple times but it's getting even worse. I feel sad for him. Is there a way to report this racist school?",
    image: null,
    topics: ["school"],
    likeCount: 15,
    likers: [],
    anonymous: false,
    expertsOnly: false,
    createdAt: "2022-02-23T02:42:34.871Z",
    updatedAt: "2022-02-23T02:42:34.871Z",
    replies: [],
  },
];

const questionOfTheDay: Question = {
  question:
    "Your child is crying after getting a shot at the doctor’s office. What should you say?",
  source: "Curious Parenting",
  choices: [
    {
      content: "“This is nothing. When I was a kid, I had surgery!”",
      explanation:
        "When we say this, kids learn that their feelings only matter in severe circumstances.",
    },
    {
      content: "“Don’t cry, give me a big kid smile!”",
      explanation: "When we say this, kids learn to fake their feelings.",
    },
    {
      content: "“C’mon, shake it off buddy!”",
      explanation: "When we say this, kids learn to push away their pain.",
    },
    {
      content: "“I know it hurts. I’m here with you. You are safe.”",
      explanation:
        "When we say this, kids learn they don’t have to hide their true feelings.",
    },
  ],
  answerIndex: 3,
};

const practices: Practice[] = [
  {
    id: "1",
    topic: "Discipline",
    description:
      "Discipline, rather than punishment, allows us to validate our kids’ feelings, set clear expectations, and teach them how to make healthy decisions on their own.",
    source: "Verywell Family",
    questions: [
      {
        question: "Your kids are fighting over a toy. What should you say?",
        source: "Curious Parenting",
        choices: [
          {
            content: "“Do you have any ideas on how we might solve this?”",
            explanation:
              "When we say this, kids learn that they are capable of thinking of creative solutions to tricky problems.",
          },
          {
            content:
              "“If you don’t stop fighting right now, no one gets the toy!”",
            explanation: "Disagreeing with someone is dangerous.",
          },
          {
            content: "“Be nice. Let them have a turn.”",
            explanation:
              "When we say this, kids learn that their wants and needs are incompatible with kindness.",
          },
          {
            content: "“Who started it?”",
            explanation:
              "When we say this, kids learn that every conflict has a villain and someone is always at fault.",
          },
        ],
        answerIndex: 0,
      },
    ],
  },
];

const agreements: Agreement[] = [
  {
    id: "1",
    title: "Eat more veggies",
    emoji: "🍱",
    summary:
      "Dad will give Braedon options to choose what veggies he wants to eat.\nDad and Braedon will cook delicious vegetables together that everyone in the family can enjoy.",
    people: ["dad", "braedon"],
    createdAt: "2022-03-01T02:42:34.871Z",
    updatedAt: "2022-03-01T02:42:34.871Z",
  },
  {
    id: "2",
    title: "No video games on school nights",
    emoji: "🎮",
    summary:
      "Braedon will not play video games on school nights and will instead use that time to complete his homework. If all homework for the week is completed, then he may play video games.",
    people: ["dad", "braedon"],
    createdAt: "2022-03-01T01:42:34.871Z",
    updatedAt: "2022-03-01T01:42:34.871Z",
  },
  {
    id: "3",
    title: "Parents will knock before entering",
    emoji: "🚪",
    summary:
      "Mom and Dad will respect Braedon’s privacy by knocking on the door and waiting for confirmation before entering his room.",
    people: ["mom", "braedon"],
    createdAt: "2022-02-26T02:42:34.871Z",
    updatedAt: "2022-02-26T02:42:34.871Z",
  },
  {
    id: "4",
    title: "We will wash dishes immediately",
    emoji: "🏠",
    summary:
      "When we are finished with a dish and/or silverware, we will bring it to the kitchen and wash it immediately. We will not let dishes stack up in our rooms.",
    people: ["mom", "dad"],
    createdAt: "2022-02-25T02:42:34.871Z",
    updatedAt: "2022-02-25T02:42:34.871Z",
  },
  {
    id: "5",
    title: "Braedon will draw on a sketchbook instead of the walls",
    emoji: "🎨",
    summary:
      "Braedon will not draw on any walls or furniture, both in our home and in other places. Instead, he will keep a sketchbook to freely express his creativity.",
    people: ["dad", "braedon"],
    createdAt: "2022-02-24T02:42:34.871Z",
    updatedAt: "2022-02-24T02:42:34.871Z",
  },
  {
    id: "6",
    title: "Mom & Dad will have date nights on Fridays",
    emoji: "😍",
    summary:
      "Every Friday, Mom and Dad will take a break from working and have a date night. We will only not have a date night if there is an urgent need and this is communicated to the other person.",
    people: ["mom", "dad"],
    createdAt: "2022-02-20T02:42:34.871Z",
    updatedAt: "2022-02-20T02:42:34.871Z",
  },
  {
    id: "7",
    title: "Braedon will make his bed daily",
    emoji: "🛏",
    summary:
      "Every day when Braedon gets out of bed, he will make the bed nicely. If he does not make his bed consistently, he must vacuum the house.",
    people: ["dad", "braedon"],
    createdAt: "2022-01-20T02:42:34.871Z",
    updatedAt: "2022-01-20T02:42:34.871Z",
  },
];

const recommendedTopics = [
  "tantrum",
  "pickeating",
  "school",
  "health",
  "boundary",
  "toy",
  "discipline",
  "love",
  "bedtime",
];

const trendingTopics = [
  "learning",
  "pandemic",
  "screentime",
  "anxiety",
  "family",
  "sleep",
  "patience",
  "sharing",
  "divorce",
];

export default {
  profile,
  posts,
  questionOfTheDay,
  practices,
  agreements,
  recommendedTopics,
  trendingTopics,
};
