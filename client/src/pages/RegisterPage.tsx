import { Link } from 'react-router-dom';

export default function RegisterPage() {
  return (
    <section className="_social_registration_wrapper _layout_main_wrapper">
      <div className="_shape_one"><img src="/assets/images/shape1.svg" alt="" className="_shape_img" /></div>
      <div className="_shape_two"><img src="/assets/images/shape2.svg" alt="" className="_shape_img" /></div>
      <div className="_shape_three"><img src="/assets/images/shape3.svg" alt="" className="_shape_img" /></div>
      <div className="_social_registration_wrap">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
              <div className="_social_registration_right">
                <div className="_social_registration_right_image"><img src="/assets/images/registration.png" alt="Register" /></div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
              <div className="_social_registration_content">
                <div className="_social_registration_right_logo _mar_b28"><img src="/assets/images/logo.svg" alt="BuddyScript" className="_right_logo" /></div>
                <p className="_social_registration_content_para _mar_b8">Get Started Now</p>
                <h4 className="_social_registration_content_title _titl4 _mar_b50">Registration</h4>
                <form className="_social_registration_form">
                  <div className="row">
                    <div className="col-12"><div className="_social_registration_form_input _mar_b14">
                      <label htmlFor="firstName" className="_social_registration_label _mar_b8">First name</label>
                      <input id="firstName" className="form-control _social_registration_input" />
                    </div></div>
                    <div className="col-12"><div className="_social_registration_form_input _mar_b14">
                      <label htmlFor="lastName" className="_social_registration_label _mar_b8">Last name</label>
                      <input id="lastName" className="form-control _social_registration_input" />
                    </div></div>
                    <div className="col-12"><div className="_social_registration_form_input _mar_b14">
                      <label htmlFor="email" className="_social_registration_label _mar_b8">Email</label>
                      <input id="email" type="email" className="form-control _social_registration_input" />
                    </div></div>
                    <div className="col-12"><div className="_social_registration_form_input _mar_b14">
                      <label htmlFor="password" className="_social_registration_label _mar_b8">Password</label>
                      <input id="password" type="password" className="form-control _social_registration_input" />
                    </div></div>
                    <div className="col-12"><div className="_social_registration_form_input _mar_b14">
                      <label htmlFor="repeat" className="_social_registration_label _mar_b8">Repeat Password</label>
                      <input id="repeat" type="password" className="form-control _social_registration_input" />
                    </div></div>
                  </div>
                  <div className="row">
                    <div className="col-12"><div className="_social_registration_form_btn _mar_t40 _mar_b60">
                      <button type="button" className="_social_registration_form_btn_link _btn1">Register</button>
                    </div></div>
                  </div>
                </form>
                <div className="row">
                  <div className="col-12"><div className="_social_registration_bottom_txt">
                    <p className="_social_registration_bottom_txt_para">Already have an account? <Link to="/login">Login</Link></p>
                  </div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
