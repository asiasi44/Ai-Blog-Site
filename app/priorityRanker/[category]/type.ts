export type FeatureType = {
  _id: string;
  name: string;
  keywords: string;
};

export type FeatureWithPriority = FeatureType & {
  priority: number;
};
