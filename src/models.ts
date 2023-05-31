export interface INote {
  id: number;
  parentId?:number;
  completed: boolean;
  hasDetails: boolean;
  showDetails:boolean;
  header: string;
  description: string;
  subnotes?: ISubNote[];
}


export interface ISubNote {
  parentId: number;
  id: number;
  completed: boolean;
  hasDetails: boolean;
  showDetails:boolean;
  header: string;
  description: string;
  subnotes?: ISubNote[];
}


export interface INoteProps{
  currNote?: INote | ISubNote ;
  notes?: INote[] | [];
  note?: INote | ISubNote ;
  parent?: INote | ISubNote;
  type?:string;
  onChangeCurrNote?: (note: INote | ISubNote | undefined | ( (note: INote | ISubNote | undefined) => INote | ISubNote)) => void;
  onChangeNote: (callback:(notes:INote[] )=>INote[] ) => void;
 }

 export interface INoteFunctions  {
  name: string,
  img: any,
  type: string,
  func: ()=> void
}