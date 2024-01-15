export interface IMerkleTree {
  merkleRoot: string;
  leaves: {
    proofs: {
      paths2Root: string[];
      paths2RootPos: number[];
    };
    leafHash: string;
    index: number;
    data: {
      publicAddress: string;
      amount: string;
      id: number;
    };
  }[];
}

export interface IProofs {
  merkleRoot: string;
  proofs: {
    paths2Root: string[];
    paths2RootPos: number[];
  };
  data: {
    publicAddress: string;
    amount: string;
    id: number;
  };
}
