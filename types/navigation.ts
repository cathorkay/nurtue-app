import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList> | undefined;
  CommunityThread: {
    postId: string;
  };
  SearchStack: {
    type: "posts" | "agreements";
  };
  Filter: undefined;
  NewPost: undefined;
  PracticePreview: {
    topic: string;
  };
  PracticeQuestion: {
    topic: string;
  };
  AgreementDetail: undefined;
  AgreementStack: undefined;
  ProfileStack: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, Screen>;

export type AgreementStackParamList = {
  NewAgreement: {
    step: number;
  };
};

export type AgreementStackScreenProps<
  Screen extends keyof AgreementStackParamList
> = StackScreenProps<AgreementStackParamList, Screen>;

export type ProfileStackParamList = {
  Profile: undefined;
};

export type ProfileStackScreenProps<
  Screen extends keyof ProfileStackParamList
> = StackScreenProps<ProfileStackParamList, Screen>;

export type SearchStackParamList = {
  Search: {
    type: "posts" | "agreements";
  };
  CommunityThread: {
    postId: string;
  };
};

export type SearchStackScreenProps<Screen extends keyof SearchStackParamList> =
  StackScreenProps<SearchStackParamList, Screen>;

export type TabParamList = {
  Community: undefined;
  ConflictResolution: undefined;
  Practice: undefined;
};

export type TabScreenProps<Screen extends keyof TabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabParamList, Screen>,
    StackScreenProps<RootStackParamList>
  >;
