import UIKit

class MockAppModel: AppModel {
    
    private var taskLists = [
        TaskList(id: 1,
                 title: "My Day",
                 color: nil,
                 type: .myDay,
                 isDefaultCollection: false,
                 isEditable: false,
                 isDeletable: false),
        TaskList(id: 2,
                 title: "Tomorrow",
                 color: nil,
                 type: .tomorrow,
                 isDefaultCollection: false,
                 isEditable: false,
                 isDeletable: false),
        TaskList(id: 3,
                 title: "My Tasks",
                 color: UIColor.blue,
                 type: .myDay,
                 isDefaultCollection: true,
                 isEditable: false,
                 isDeletable: false)
    ]
    
    func findTaskLists(completionHandler: ([TaskList]) -> Void) {
        completionHandler(Array(taskLists))
    }
    
    func findTaskListById(id: TaskList.ID, completionHandler: (TaskList?) -> Void) {
        let result = taskLists.first { taskList in
            return taskList.id == id
        }
        completionHandler(result)
    }
}
