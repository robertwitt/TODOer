import Foundation

/**
 Protocol of the app model used by view controllers to access the domain entities.
 */
protocol AppModel {
    func findTaskLists(completionHandler: ([TaskList]) -> Void)
    func findTaskListById(id: TaskList.ID, completionHandler: (TaskList?) -> Void)
}
