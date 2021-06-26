import XCTest
@testable import TODOer

class TaskListBuilderTests: XCTestCase {
    func testCreatingTaskList() {
        let taskList = TaskListBuilder()
            .id(42)
            .title("Life List")
            .colorHex("FFFFFF")
            .listType(.collection)
            .isDefaultCollection(true)
            .build()
        XCTAssertEqual(taskList.id, 42)
        XCTAssertEqual(taskList.title, "Life List")
        XCTAssertEqual(taskList.listType, .collection)
        XCTAssertEqual(taskList.isDefaultCollection, true)
    }
    
    func testCreatingTaskListWithoutID() {
        let taskList = TaskListBuilder()
            .title("New List")
            .listType(.collection)
            .build()
        XCTAssertEqual(taskList.id, -1)
        XCTAssertEqual(taskList.title, "New List")
        XCTAssertEqual(taskList.listType, .collection)
        XCTAssertEqual(taskList.isDefaultCollection, false)
    }
    
    func testCreatingTaskListWithoutType() {
        let taskList = TaskListBuilder()
            .id(42)
            .title("Life List")
            .build()
        XCTAssertEqual(taskList.id, 42)
        XCTAssertEqual(taskList.title, "Life List")
        XCTAssertEqual(taskList.listType, .collection)
        XCTAssertEqual(taskList.isDefaultCollection, false)
    }
    
    func testCreatingTaskListFromTemplate() {
        let template = TaskList(id: 42,
                                title: "Life List",
                                color: nil,
                                listType: .collection,
                                isDefaultCollection: false)
        let taskList = TaskListBuilder(template: template)
            .name("Changed Title")
            .isDefaultCollection(true)
            .build()
        XCTAssertEqual(taskList.id, 42)
        XCTAssertEqual(taskList.title, "Changed Title")
        XCTAssertNil(taskList.color)
        XCTAssertEqual(taskList.listType, .collection)
        XCTAssertEqual(taskList.isDefaultCollection, true)
    }
}
