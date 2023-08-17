I chose to use a monorepo to quickly setup and reuse some components across services

I created a registry component so that we can dynamically add the services directly to the event processor, this should help with decoupling the modules

For mongodb I chose to use the mongoose module since nest has an integration with it already 

For same instance event propagation, we can use the eventemitter package to propagate events instead of injecting the service and calling the methods, this way we can avoid coupling the modules with each other and will allow more flexibility with how we handle events.

--TODO

Validation and additional transformation can be handled by the class-validator and class-transformer if the interceptor is setup properly

--Considerations

I was considering using 1 instance then propagate the events within the instance, and just have different listeners declared throughout the module, but it didn't make any sense since data is still passed through the service-bus

I have considered creating a custom Transport and strategy to make use of the microservice module of nest, but since the service bus already had a message structure I didn't go for it since I didn't want to get any conflicts with the handlers that are bundled with the sdk.