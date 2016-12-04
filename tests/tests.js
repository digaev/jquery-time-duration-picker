$( function() {
  var input = $( "#duration" );
  var seconds = 12345;

  $( "#duration" ).timeDurationPicker( {
    seconds: true,
    defaultValue: seconds
  } );

  QUnit.test( "years()", function( assert ) {
    assert.equal( input.timeDurationPicker( "years" ), 0 );
  } );

  QUnit.test( "month()", function( assert ) {
    assert.equal( input.timeDurationPicker( "months" ), 0 );
  } );

  QUnit.test( "days()", function( assert ) {
    assert.equal( input.timeDurationPicker( "days" ), 0 );
  } );

  QUnit.test( "hours()", function( assert ) {
    assert.equal( input.timeDurationPicker( "hours" ), 3 );
  } );

  QUnit.test( "minutes()", function( assert ) {
    assert.equal( input.timeDurationPicker( "minutes" ), 25 );
  } );

  QUnit.test( "seconds()", function( assert ) {
    assert.equal( input.timeDurationPicker( "seconds" ), 45 );
  } );

  QUnit.test( "getSeconds()", function( assert ) {
    assert.equal( input.timeDurationPicker( "getSeconds" ), seconds );
  } );

  QUnit.test( "getDuration()", function( assert ) {
    assert.equal( input.timeDurationPicker( "getDuration" ), "3 hours, 25 minutes and 45 seconds" );
  } );
} );
