namespace db;

using {sap.common.CodeList} from '@sap/cds/common';

entity TaskStatusCodes : CodeList {
  key code : String(1);
}

type TaskStatusCode : Association to one TaskStatusCodes;
