CREATE KEYSPACE detection
  WITH REPLICATION = { 
   'class' : 'SimpleStrategy', 
   'replication_factor' : 1 
  };

CREATE TABLE event (
   unique_id uuid PRIMARY KEY,
   source uuid,
   latitude float,
   longitude float,
   object_type text,
   confidence int,
   created_at timestamp
);

-- Create the index
CREATE INDEX event_object_type_idx ON event (object_type);


INSERT INTO event (unique_id, source, latitude, longitude, object_type, confidence, created_at)
VALUES (
   uuid(),
   uuid(),
   34.0522,
   -118.2437,
   'car',
   95,
   toTimestamp(now())
);

INSERT INTO event (unique_id, source, latitude, longitude, object_type, confidence, created_at)
VALUES (
   uuid(),
   uuid(),
   48.8566,
   2.3522,
   'truck',
   90,
   '2023-10-03 09:45:30'
);

INSERT INTO event (unique_id, source, latitude, longitude, object_type, confidence, created_at)
VALUES (
   uuid(),
   uuid(),
   35.6895,
   139.6917,
   'motorcycle',
   80,
   '2023-10-04 18:00:00'
);