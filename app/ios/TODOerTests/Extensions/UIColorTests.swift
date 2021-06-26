import XCTest
@testable import TODOer

class UIColorTests: XCTestCase {
    func testColorFromHex() {
        XCTAssertNotNil(UIColor(hex: "00FF00"))
        XCTAssertNil((UIColor(hex: "01234567")))
    }
}
