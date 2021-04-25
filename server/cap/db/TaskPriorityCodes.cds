namespace db;

using {sap.common.CodeList} from '@sap/cds/common';

entity TaskPriorityCodes : CodeList {
  key code : Integer;
}

type TaskPriorityCode : Association to one TaskPriorityCodes;
