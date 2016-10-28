/**
 * @ngdoc service
 * @module epr
 * @name eventService
 * @description
 *
 * Provide observer pattern
 *
 * ### Usage
 * ```javascript
 * $scope.events = new EventService();
 * $scope.events.subscribe('Event1',function(data) {});
 * $scope.events.removeTopic('Event1');
 * $scope.events.publish('Event1',3);
 *```
 */
angular.module('epr')
    .service('EventService', function () {
        'use strict';

        return function() {
            var topics = {};

            function topicSubscribe(topic, listener) {
                // Create the topic's object if not yet created
                if (!_.has(topics, topic)) {
                    topics[topic] = [];
                }

                // Add the listener to queue
                var index = topics[topic].push(listener) - 1;

                // Provide handle back for removal of topic
//                console.log('subscribed into topic ', topic,  topics);
                return {
                    remove: function () {
                        if(topics && topics[topic] && topics[topic][index]) {
//                            console.log('removed from topic ', topic,  topics);
                            delete topics[topic][index];
                        }
                    }
                };
            }

            return {
                topics : topics,
                subscribe: function(subscribeTopics, listener) {
                    var res = [];
                    if (_.isArray(subscribeTopics)) {
                        _.each(subscribeTopics, function (topic) {
                            res.push(topicSubscribe(topic, listener));
                        });
                    } else {
                        res = topicSubscribe(subscribeTopics, listener);
                    }

                    return res;
                },
                subscribeAll: function(listener) {
                    var res = [];
                    _.each(topics, function (topic) {
                        res.push(topicSubscribe(topic, listener));
                    });

                    return res;
                },
                publish: function(topic, info) {
                    // If the topic doesn't exist, or there's no listeners in queue, just leave
                    if(!_.has(topics, topic)) {
                        return false;
                    }

                    // Cycle through topics queue, fire!
                    var listeners = topics[topic],
                        listenersCount = listeners.length;
                    for (var i = 0; i < listenersCount; i++) {
                        if (listeners[i]) {
                            listeners[i](topic, info !== undefined ? info : {});
                        }
                    }
                },

                removeTopics: function(removeTopics) {
                    if (_.isArray(removeTopics)) {
                        _.each(removeTopics, function (topic) {
                            if(_.has(topics, topic)) {
                                delete topics[topic];
                            }
                        });

//                        console.log('removed from topic ',  topics);
                        return true;
                    } else {
                        // if we have a single topic instead of array of topics we can also remove it
                        if(_.has(topics, removeTopics)) {
                            delete topics[removeTopics];

//                            console.log('removed from topic ',  topcis);
                            return true;
                        }
                    }

                    return false;
                },

                removeMultiple: function (array) {
                    var i, a = 0;
                    for (i = 0, a = array.length; i < a; i++) {
                        if (array[i].remove) {
                            array[i].remove();
                        }
                    }
                },

                removeAll: function() {
                    //topics = {};
                    return true;
                }

            };
        };
    });