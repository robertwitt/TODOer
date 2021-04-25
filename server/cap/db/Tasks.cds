namespace db;

using {cuid} from '@sap/cds/common';
using {db.TaskCollections} from './TaskCollections';
using {db.TaskPriorityCode} from './TaskPriorityCodes';
using {db.TaskStatusCode} from './TaskStatusCodes';

entity Tasks : cuid {
  title             : String(40);
  collection        : Association to one TaskCollections not null;
  status            : TaskStatusCode not null;
  priority          : TaskPriorityCode;
  dueDate           : Date;
  dueTime           : Time;
  isPlannedForMyDay : Boolean not null;
}
