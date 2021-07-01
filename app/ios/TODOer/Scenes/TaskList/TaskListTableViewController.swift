import UIKit

class TaskListTableViewController: UITableViewController {
    
    private var taskViews = [TaskList]()
    private var taskCollections = [TaskList]()

    override func viewDidLoad() {
        super.viewDidLoad()
        setupTableView()
        loadTaskLists()
    }
    
    private func setupTableView() {
        tableView.refreshControl = UIRefreshControl()
        tableView.refreshControl?.addTarget(self, action: #selector(handleRefreshControl), for: .valueChanged)
    }
    
    @objc func handleRefreshControl() {
        loadTaskLists()
    }
    
    private func loadTaskLists() {
        if tableView.refreshControl?.isRefreshing == false {
            tableView.refreshControl?.beginRefreshing()
        }
        
        AppDelegate.shared.appModel.findTaskLists { taskLists in
            taskViews = taskLists.filter({ $0.type != .collection })
            taskCollections = taskLists.filter({ $0.type == .collection })
            tableView.reloadData()
            tableView.refreshControl?.endRefreshing()
        }
    }

    // MARK: Table View Data Source

    override func numberOfSections(in tableView: UITableView) -> Int {
        return Section.count
    }

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        switch Section(rawValue: section) {
        case .view:
            return taskViews.count
        case .collection:
            return taskCollections.count
        default:
            return 0
        }
    }

    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let taskList = taskList(at: indexPath)
        
        let cell = tableView.dequeueReusableCell(withIdentifier: "TaskListCell", for: indexPath)
        cell.textLabel?.text = taskList?.title
        cell.textLabel?.textColor = taskList?.color
        cell.accessoryType = splitViewController?.isCollapsed == true ? .disclosureIndicator : .none

        return cell
    }
    
    private func taskList(at indexPath: IndexPath) -> TaskList? {
        switch Section(rawValue: indexPath.section) {
        case .view:
            return taskViews[indexPath.row]
        case .collection:
            return taskCollections[indexPath.row]
        default:
            return nil
        }
    }

    /*
    // Override to support conditional editing of the table view.
    override func tableView(_ tableView: UITableView, canEditRowAt indexPath: IndexPath) -> Bool {
        // Return false if you do not want the specified item to be editable.
        return true
    }
    */

    /*
    // Override to support editing the table view.
    override func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCell.EditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == .delete {
            // Delete the row from the data source
            tableView.deleteRows(at: [indexPath], with: .fade)
        } else if editingStyle == .insert {
            // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view
        }    
    }
    */

    /*
    // Override to support rearranging the table view.
    override func tableView(_ tableView: UITableView, moveRowAt fromIndexPath: IndexPath, to: IndexPath) {

    }
    */

    /*
    // Override to support conditional rearranging of the table view.
    override func tableView(_ tableView: UITableView, canMoveRowAt indexPath: IndexPath) -> Bool {
        // Return false if you do not want the item to be re-orderable.
        return true
    }
    */

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */
}

private enum Section: Int {
    case view = 0
    case collection = 1
    static let count = 2
}
