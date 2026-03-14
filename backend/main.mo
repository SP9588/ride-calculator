import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Random "mo:core/Random";
import Runtime "mo:core/Runtime";
import Debug "mo:core/Debug";
import Int "mo:core/Int";

actor {
  let bookings = Map.empty<Principal, TripData>();
  let confirmedTrips = Map.empty<Principal, TripData>();

  type TripData = {
    otp : Nat;
    distance : ?Float;
    time : ?Float;
    cost : ?Nat;
    price : ?Nat;
  };

  public shared ({ caller }) func startBooking() : async Nat {
    let rng = Random.crypto();
    let otp = await* rng.natRange(0, 1_000_000); // Range: 0 - 999_999

    let trip : TripData = {
      otp;
      distance = null;
      time = null;
      cost = null;
      price = null;
    };

    bookings.add(caller, trip);
    otp;
  };

  public query ({ caller }) func checkTripExists() : async Bool {
    bookings.containsKey(caller) or confirmedTrips.containsKey(caller);
  };

  public shared ({ caller }) func verifyOTP(enteredOTP : Nat) : async Bool {
    switch (bookings.get(caller)) {
      case (?trip) {
        if (trip.otp == enteredOTP) {
          confirmedTrips.add(caller, trip);
          bookings.remove(caller);
          true;
        } else {
          false;
        };
      };
      case (null) { false };
    };
  };

  public shared ({ caller }) func getDistance() : async Float {
    switch (bookings.get(caller)) {
      case (?trip) {
        let distance = await* Random.crypto().natRange(0, 100);
        distance.toFloat();
      };
      case (null) { Runtime.trap("User has no trip yet") };
    };
  };

  public shared ({ caller }) func getTime(distance : Float) : async Float {
    distance * 2;
  };

  public query ({ caller }) func getCost(_distance : Float, _time : Float) : async Nat {
    ((_distance * 100) + (_time * 120)).toInt().toNat();
  };

  public query ({ caller }) func getFinalTripStep(step : Nat) : async Nat {
    Debug.print("Executing Step " # step.toText());
    step;
  };
};
