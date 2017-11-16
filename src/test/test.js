describe('myApp', function () {
    var scope, ctrl, httpBackend;

    beforeEach(module('myApp'));

    describe('Test GET request onload page', function () {
        beforeEach(inject(function (_$httpBackend_, $rootScope, $controller) {
            httpBackend = _$httpBackend_;
            httpBackend.when('GET', '/userlist')
                .respond([{
                    firstname: "Angela",
                    lastname: "Henderson",
                    year: 1976
                }]);

            scope = $rootScope.$new(); //этот работает тест

            ctrl = $controller('appCtrl', {
                $scope: scope
            });
        }));

        it('GET Request onload', function () {
            httpBackend.flush();
            expect(scope.userlist).toEqual([{
                firstname: "Angela",
                lastname: "Henderson",
                year: 1976
            }]);
        });
    })

    describe('Test POST request by addUser', function () {
        beforeEach(inject(function (_$httpBackend_, $rootScope, $controller) {
            httpBackend = _$httpBackend_;
            httpBackend.when('POST', '/userlist')
                .respond({
                    firstname: 'Tim',
                    lastname: 'Miller',
                    year: 1990
                });
            httpBackend.when('GET', '/userlist')
                .respond([]);
            scope = $rootScope.$new();

            ctrl = $controller('appCtrl', {
                $scope: scope
            });
        }));
        it('POST Request addUser', function () {
            
            scope.user = {
                firstname: 'Tim',
                lastname: 'Miller',
                year: 1990
            }; 
            scope.addUser()
            httpBackend.flush();
            console.log(scope.userlist)
            expect(scope.userlist).toEqual([{
                firstname: "Tim",
                lastname: "Miller",
                year: 1990
            }]);
        });
    })
});