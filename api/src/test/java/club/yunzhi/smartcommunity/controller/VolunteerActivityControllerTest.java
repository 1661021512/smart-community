package club.yunzhi.smartcommunity.controller;

import club.yunzhi.smartcommunity.entity.Attachment;
import club.yunzhi.smartcommunity.entity.VolunteerActivity;
import net.bytebuddy.utility.RandomString;

import java.util.Random;

public class VolunteerActivityControllerTest {
    public static VolunteerActivity getOneVolunteerActivity() {
       VolunteerActivity volunteerActivity = new VolunteerActivity();

       volunteerActivity.setId(new  Random().nextLong());
       volunteerActivity.setContact(new RandomString().nextString());
       volunteerActivity.setDetail(new RandomString().nextString());
       volunteerActivity.setEndDate(new Random().nextInt());
       volunteerActivity.setInitiator(new RandomString().nextString());
       volunteerActivity.setName(new RandomString().nextString());
       volunteerActivity.setPlace(new RandomString().nextString());
       volunteerActivity.setNumberOfPlanned(new Random().nextInt());

        Attachment image = new Attachment();
        image.setId(new Random().nextLong());
        volunteerActivity.setImage(image);

        return volunteerActivity;
    }
}
