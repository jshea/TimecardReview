describe("restFactory Test", function () {
    // Arrange
    var service, backend;
    
    beforeEach(angular.mock.module("timecardReview")); // Create mock Timecard Review module.

    beforeEach(angular.mock.inject(function (restFactory, $httpBackend, $cookieStore) {
        service = restFactory;
        backend = $httpBackend;
        $cookieStore.put('activeUser', 'username'); // Set up our login cookie.
    }));

    // Act & Assert.
    it('should have a restFactory service', function() {
        expect(service).toBeDefined(); // Make sure our restFactory is defined.
    });

    it("have all Ajax requests been received", function () {
        backend.verifyNoOutstandingExpectation(); // Checks that all expected requests have been received.
    });

    it('should getAllEmployeesForActiveUser', function() {
        backend.expect('GET', '/all/username').respond([{'username':'mslate'}]); // Mock request.

        service.getAllEmployeesForActiveUser(function(data) { // Call our function.
            expect(data).toBeDefined(); // Make sure response is defined.
            expect(data[0].username).toEqual('mslate'); // Verify we receive our mock data correctly.
        });

        backend.flush(); // Send back pending response from $httpBackend (i.e. resolves promise).
    });
});