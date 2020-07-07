trigger testTrigger on AccountChangeEvent (after insert) {
system.debug('AccountChangeEvent');
    system.debug(trigger.new);
     system.debug(trigger.old);
}