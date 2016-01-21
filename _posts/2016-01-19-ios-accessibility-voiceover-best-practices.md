---
layout: post
title: "iOS Accessibility - Best Practices for the VoiceOver User Experience"
date: 2016-01-19 15:40:00
author: Nick Sheehan
tags: [ios, accessibility, voiceover]
category: blog
images:
  accessible-wireframe: /assets/posts/ios-accessibility-voiceover-best-practices/accessible-wireframe-markup.png
  interface-builder: /assets/posts/ios-accessibility-voiceover-best-practices/interface-builder-accessibility.png
---
Here at Capital One, we are working hard to write “best in class” financial services applications for all users - including our users with disabilities. Over the past six months, I have had the opportunity to work on the Capital One Mobile for iPhone application. Specifically, I have been heavily involved in our user experience for VoiceOver (VO) users. VO, for the uninitiated, is Apple’s screen reader technology, which can be used by blind and low vision users to get the most from their mobile devices.<!--more--> While a great benefit to the vision impaired community, all users can benefit from the VO experience. For example, I have personally used our VO experience on the Capital One Mobile for iPhone application to pay my credit bill while I was in the car and unable to look at the screen. *To learn more about VoiceOver and accessibility check out Apple’s documentation [here](http:/www.apple.com/accessibility/ios/voiceover/).*

Let's talk about making applications accessible and the best practices we discovered as a part of our journey on the Capital One Mobile for iPhone application. For the scope of this article I will focus on two areas:

* Taking a holistic approach to accessibility.
* Developer best practices.

## Taking A Holistic Approach To Accessibility

Early in the development process we discovered we needed to consider the VO experience earlier on, and that everyone working on the app needed to be aware of how their particular role within the project related to achieving a WCAG 2.0 level of compliance. *For more information on WCAG 2.0 standards go [here](http:/www.w3.org/TR/WCAG20/) for web standards and [here](http:/www.w3.org/TR/mobile-accessibility-mapping/) for their mobile draft (which has not been officially published yet).*

Simply adding “make screen accessible” to your acceptance criteria was not enough to design the kind of application we had in mind for our users. So we took a deep look at our approach and decided on some changes to our development process. What we found was that everyone on the project wanted to make our application accessible, but we didn’t know the WCAG guidelines as thoroughly as we should have. To do this, we needed to “demystify” accessibility, and with this consideration in mind, we wrote a development process where design, requirements writing, development, testing, and auditing would all play an equally important role in making our application more accessible. 

Since not everyone on the team was well versed in the [Title III of the Americans with Disabilities Act](http://www.ada.gov/t3hilght.htm), we came up with several points of emphasis for design and requirements writing to help get the application closer to accessible before submitting to our Digital Accessibility Team (subject matter experts) for review. See below for more details.

### Design

For each wireframe we designed there is an overlay that includes the following information (See a visual example in the Requirements Writing section).

1. Define each VO frame.
2. Establish the swiping order for each form.
3. Combine swipes and labels where applicable.
4. Special considerations (Does each page have a unique title? Is color contrast at least 3:1, or 4.5:1 for text less than 18 point?).

### Requirements Writing

In each story there is a section for accessibility related requirements. We decided to create a numbered list to correspond with the swiping order in each section.

1. *VO Text:* Define the copy for each VO frame to correspond with the `accessibilityLabel` for iOS.
2. *Traits:* Define each frame’s trait(s) to correspond with the `accessibilityTraits` for iOS (Button, Heading, Static Text, etc.).
3. *Additional Context:* Add additional context if needed to correspond with the `accessibilityHint` (Use sparsely, only add if necessary and not redundant to the label.).
4. *Value/State:* Define the elements value/state if applicable (Not Enabled, Selected, etc.).

These additions to how we conceive of design and requirements writing have been instrumental in building stronger accessibility acceptance criteria for each of our screens and UI stories. 

What does this look like on the screen?

## Example of Accessible Wireframe and Accessibility Acceptance Criteria

[![Accessibility in Interface Builder]({{ site.baseurl | append:page.images.accessible-wireframe }})]({{ site.baseurl | append:page.images.accessible-wireframe }})

1. VO Text = “Capital One”
  * *Trait = Heading*
2. VO Text = “Sign In”
  * *Trait = Heading*
3. VO Text = “Username”
  * *Trait = Textfield*
  * *Value = &lt;value entered into textfield&gt;*
4. VO Text = “Password”
  * *Trait = Textfield*
  * *Value = &lt;value entered into textfield&gt; (*** in this case)*
5. VO Text = “Remember Me”
  * *Trait = Switch Button*
  * *Value = selected or unselected*
6. VO Text = “Sign In”
  * *Trait = Button / Not Enabled (if applicable)*
7. VO Text = “Need help?”
  * *Trait = Button*
8. VO Text = “Security & Privacy”
  * *Trait = Button*
9. VO Text = “Version &lt;x.y.z&gt;”
  * *Trait = Label*
10. VO Text = “Capital One 360 PIN Sign in”
  * *Trait = Button*

Now we’ve created a beautiful spec for making a screen that’s accessible and WCAG 2.0 conformant! This takes the guesswork out of accessibility and certainly “demystifies” the next steps in the process. Next this spec is passed off to Engineering to implement, and then Testing to review. This is a huge improvement to the workflow for our mobile organization and allows us to be relatively self-sufficient, ensuring our code is up to accessibility standards without cumbersome project management oversight. I say "relatively" in the sense that this development process will get our screens closer to accessible, but without bypassing the need for the Digital Accessibility Program Team to review our work and ensure we are fully WCAG 2.0 conformant.

## Development Best Practices

Time for the nitty gritty! In my journey through the Capital One Mobile for iPhone app I found there are lots of different ways to write your iOS code to meet WCAG 2.0 standards. Below is a list of development best practices that evolved through our code review process on this project.

1. If the content on the screen is static, use Interface Builder to configure accessibility options.

	[![Accessibility in Interface Builder]({{ site.baseurl | append:page.images.interface-builder }})]({{ site.baseurl | append:page.images.interface-builder }})

2. If the content on the page is dynamic, use code to configure accessibility options.
3. Attributed Strings do not always play nice with the VO screen reader. We found the screen reader will take multiple swipes to read through a string of this type. Sometimes this is an advantage, but in the case of reading out currency amounts it creates a problem. To solve this problem we created an extension on String called `formatCurrencyForVoiceOver`. The following is a set of functions that can be used to create a user-friendly currency string for voice over users.  In order to use simply call `formatCurrencyForVoiceOver` on your string (ex: `myAttributedCurrencyString.formatCurrencyForVoiceOver()`).

	```swift
	import UIKit

	/**
	This function takes a currency string and formats it into an accessible, voice over
	friendly string
	*/
	extension String {
	    func formatCurrencyForVoiceOver () -> String {
	        do {
	            let split = try splitCurrency(self)
	            return formatDollarsAndCentsToReadableString(split.dollars, centString: split.cents)
	        }
	        catch {
	            return NSLocalizedString(" , Unknown Amount, ", comment: "")
	        }
	    }
	}

	enum FormattingError: ErrorType {
	    case Short
	}

	struct CurrencyVerbiage {
	    let dollarSingular = NSLocalizedString("dollar and", comment: "dollar amount for accessibility voice over text")
	    let dollarPlural = NSLocalizedString("dollars and", comment: "plural dollar amount for accessibility voice over text")
	    let centSingular = NSLocalizedString("cent", comment: "cent amount for accessibility voice over text")
	    let centPlural = NSLocalizedString("cents", comment: "plural cent amount for accessibility voice over text")
	}

	/**
	    This takes in a currency amount and strips out any characters not necessary
	    for formatting the text for voice over
	  */
	extension NSCharacterSet {
	    class func ValidAccessibilityCurrencyCharactersSet() -> NSCharacterSet {
	        let validCharacters = "0123456789-"
	        return NSCharacterSet(charactersInString: validCharacters).invertedSet
	    }
	}

	/**
	    This function takes in an unformatted currency checks it to see if its valid.
	    This function assumes that a valid amount will contain at least 3 characters.
	    This function returns a valid currency amount in dollars and cents.
	  */
	func splitCurrency(currencyString: String) throws -> (dollars: String, cents: String) {
	    let rawCurrencyString = currencyString.componentsSeparatedByCharactersInSet(NSCharacterSet.ValidAccessibilityCurrencyCharactersSet()).joinWithSeparator("")
	    guard rawCurrencyString.characters.count > 2 else {
	        throw FormattingError.Short
	    }
	    
	    let splitIndex = rawCurrencyString.endIndex.advancedBy(-2)
	    let dollars = rawCurrencyString.substringToIndex(splitIndex)
	    let cents = rawCurrencyString.substringFromIndex(splitIndex)
	    
	    return(dollars, cents)
	}

	/**
	    This function formats the valid dollars and cents to be read back to a voice over user
	  */
	func formatDollarsAndCentsToReadableString (dollarString: String, centString:String) -> (String) {
	    let dollarText = dollarString == "1" ?  CurrencyVerbiage().dollarSingular : CurrencyVerbiage().dollarPlural
	    let centText = centString == "01" ?  CurrencyVerbiage().centSingular : CurrencyVerbiage().centPlural
	    let formattedVoiceOverText = "\(dollarString) \(dollarText) \(centString) \(centText)"
	    return formattedVoiceOverText
	}
	```

4. Every page must have a heading, and many pages may have several subheadings. This can be applied in Interface Builder as of Xcode 7.1, but it must be applied in code if you are using a previous version. Please note at the time this article was written (December 2015), you must build your application on a device to test a header trait is applied properly.  It is a defect with the accessibility inspector in the iOS simulator at this time.
  
	```swift
	headingLabel.accessibilityTraits |= UIAccessibilityTraitHeader
	```

5. If you need to concatenate multiple elements into one VO swipe, disable accessibility on the sub-elements and enable accessibility on the “parent” element only. Note: Follow best practices 1 and 2 here for static vs. dynamic content. See below for an example of what a dynamic piece of code could look like.  In this example the VO frame would take the frame of the cell and read the text from label1 and label2 in one swipe instead of two individual swipes.

	```swift
	cell.isAccessibilityElement = true
	cell.label1.isAccessibiltyElement = false
	cell.label2.isAccessibilityElement = false
	cell.accessibilityLabel = "\(cell.label1.text), \(cell.label2.text)"
	```

6. If you have a complex, custom control, implement `accessibilityActivate` informal protocol. This allows a VO user to perform a double tap instead of performing the actual app gesture, which might not be possible to perform with VO enabled. An example would be if you have a `slider.swift` class in your project and you want to trigger a bill pay confirmation on a double tap instead of a swipe for a VO user. Implement this method in the `slider.swift` class.

	```swift
	override func accessibilityActivate() -> Bool {
		//perform desired action
		yourAwesomeActionFunction()
		return true
	}
	```

These are some of the more significant findings and development patterns that evolved as part of our learning process in the Capital One Mobile for iPhone project. As we continue on our journey towards building better, more accessible applications, we look forward to exploring more accessibility controls in future versions of the Capital One Mobile for iPhone application, as well as on future Capital One projects.

If you have additional questions related to this post or would like to contact our Accessibility Team, please send us a note [here](https://www.capitalone.com/legal/contact-accessibility/?Log=1&EventType=Link&ComponentType=T&LOB=MTS%3A%3ALCTMMQC4S&PageName=Accessibility+at+Capital+One&PortletLocation=4%3B16-col%3B2-2-1-1&ComponentName=capital-one-accessibility-contact-form-rev%3B15&ContentElement=1%3BContact+Us%3Cspan+class%3D%22icon-chevron%22%3E%3C%2Fspan%3E&TargetLob=MTS%3A%3ALCTMJBE8Z&TargetPageName=Contact+Capital+One+Accessibility&referer=https%3A%2F%2Fwww.capitalone.com%2Fabout%2Faccessibility-commitment).