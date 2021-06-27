import XCTest
@testable import TODOer

class TaskListBuilderTests: XCTestCase {
    func testCreatingTaskList() {
        let taskList = TaskListBuilder()
            .title("Life List")
            .colorHex("FFFFFF")
            .isDefaultCollection(true)
            .build()
        XCTAssertEqual(taskList.id, -1)
        XCTAssertEqual(taskList.title, "Life List")
        XCTAssertEqual(taskList.type, .collection)
        XCTAssertEqual(taskList.isDefaultCollection, true)
    }
    
    func testCreatingTaskListFromTemplate() {
        let template = TaskList(id: 42,
                                title: "Life List",
                                color: nil,
                                type: .collection,
                                isDefaultCollection: false,
                                isEditable: true,
                                isDeletable: true)
        let taskList = TaskListBuilder(template: template)
            .title("Changed Title")
            .isDefaultCollection(true)
            .build()
        XCTAssertEqual(taskList.id, 42)
        XCTAssertEqual(taskList.title, "Changed Title")
        XCTAssertNil(taskList.color)
        XCTAssertEqual(taskList.type, .collection)
        XCTAssertEqual(taskList.isDefaultCollection, true)
    }
}
