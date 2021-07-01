import XCTest
@testable import TODOer

class AppModelTests: XCTestCase {
    private let appModel = MockAppModel()
    
    func testFindingAllTaskLists() {
        appModel.findTaskLists { taskLists in
            XCTAssertEqual(taskLists.count, 3)
            XCTAssertEqual(taskLists[0].type, .myDay)
            XCTAssertEqual(taskLists[1].type, .tomorrow)
            XCTAssertEqual(taskLists[2].type, .collection)
        }
    }
    
    func testFindingTaskListByID() {
        appModel.findTaskListByID(id: 3) { taskList in
            XCTAssertNotNil(taskList)
            // swiftlint:disable force_unwrapping
            XCTAssertEqual(taskList!.id, 3)
            // swiftlint:enable force_unwrapping
        }
        appModel.findTaskListByID(id: 4) { taskList in
            XCTAssertNil(taskList)
        }
    }
}
