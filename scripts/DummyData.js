db = connect( 'mongodb://localhost/SproutShareNoSQL' );
db.communityposts.insertMany( [
   {
      user_ID: '001',
      comm_post_date: new ISODate("2022-09-12T14:10:30Z"),
      comm_post_title: 'Question about strawberries',
      comm_post_body: 'Recently, rabbits have been eating my strawberries. They\'re cute as can be, but also a real pain! Is there any way I can stop them without hurting them?'
   },
   {
      user_ID: '002',
      comm_post_date: new ISODate("2022-09-13T14:10:30Z"),
      comm_post_title: 'Cicada thread: What you need to know',
      comm_post_body: 'You all knew it was coming; the cicada thread. Here are some useful resources for you for when these bugs start cropping up again.'
   },
   {
      user_ID: '001',
      comm_post_date: new ISODate("2022-09-12T14:10:30Z"),
      comm_post_title: 'Jones\' Labor Day BBQ: What are you bringing?',
      comm_post_body: 'I\'m bringing hotdogs with relish and pickles - made from my own cucumbers, of course! They turned out great after those tips that Cheryl gave me.'
   }
] )