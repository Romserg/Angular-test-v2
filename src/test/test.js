describe('myApp', function () {
    var scope, ctrl, httpBackend;

    beforeEach(module('myApp'));

    beforeEach(inject(function (_$httpBackend_, $rootScope, $controller) {
        httpBackend = _$httpBackend_;
        httpBackend.when('GET', 'userlist')
            .respond({
                firstname: "Angela",
                lastname: "Henderson",
                year: 1976,
            });
        scope = $rootScope.$new();

        ctrl = $controller('appCtrl', {
            $scope: scope
        });
    }));

    it("Test", function () {
        expect(scope.test).toEqual("test")
    })

    it("test 2", function(){
        expect(scope.refresh).toEqual("Angela")
    })

    // it('GET Request', function(){
    //     scope.respond
    //     httpBackend.flush();
    //     expect(scope.userlist).toBeDefined();

    // });

    // it('Add new person in array', function(){
    //     scope.addNew();
    //     expect(scope.usersArray.length).toBeGreaterThan(0)
    // });

    // it('Remove selected person from array', function(){
    //     let temp = scope.usersArray.length;
    //     scope.deletePerson();
    //     expect(scope.usersArray.length).toBeLessThan(temp);
    // });
});