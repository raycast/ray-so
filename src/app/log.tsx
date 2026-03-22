"use client";

import { useEffect, useState } from "react";

export function Log() {
  const [logged, setLogged] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const isDev = process.env.NODE_ENV === "development";
  useEffect(() => {
    if (isClient && !logged && !isDev) {
      console.log(`
..-''-'    ..'    ''  '''  '. ' .'-  - '.   .'- --'.-'-'  -''  '  .'''-.''...-
 ..' ' ''''. -.-'' -'.'      ..''..-.  - '''' ..-. ' '-  '' '' .' '' - ' -  .'
''  .  .'..-' --   .  .'''- '.  . ---' -  '- .'-  - ' -. -' ''-  --''.. ' -  '
 ''..  . '..' ''  ''-' -'    ..-'. '--;r  -.- ' ''.    ---'.' -. '-'-..-   '' 
 '''  .' '' -'' ''- '.'  ..' -..-'-."YztTr'' -. .. '.'. '-- ''.- . '-   .- -..
-. . '''- --'--  '  .    . '-    - :(tfysfY='' '''' ..'..''--' '. '.'''.. - .-
-  . ..-'''--'' '- ' '-. -.-  '   -'-~\syfyz1r..-' '..   '.''   -'.   -'-   ''
  '.- -  ''' '.  .'  '--.'..'.=}i~'' .'_\tyfstY;. . '.' '-' -'....-' ' '... -'
 -'  .    - - ' -  '   ''-  !Yffyzi,'' . :?ysttt1*-  .'- '  ''.  ''   ..  -'  
.-- --' ' '.   '  ----' '''  +}tffysi~   ' :\fsszf1;.'..' -'  '-- ' ' -  '-- -
 '.  --' '.'   ' ' .''-'<'''' .<]tttfsv,. .  _|yzzysT;'-''-... '..'  '' -- .  
  '. -'-'   '---..'.''r1s1?  .(|?Lttyfszi)|\|(|izytsss1"'  '. ' ''''''  '-.'  
'.'-.' ''    ' -- '- <1zszfi'.1syysszsytsyyfyzzsyzytyffsT*.'''  ' '- --'  '' .
-.' '' . '. .-' ' - - .*1]>-.'1zsysszfztfysztfyszsssfszzstT* - ..'.'   '  '- -
' .     .'  ''-'*i< -'''. . - 1ttzsftfzzfsytzzyysttfsftzfzffY*.'. '- --' . .' 
 -'  - ''-'-.-=Tfyzl+.'  --' '1fszzsfsssfzyzfsfsyzzfyyt>|szzts1*-.'- .'..'-.'-
--'. '' - '   _itsyff}>  '. ' Yyzsffzsfzstyzztzsfzsssff, ~(zftyz1*'-''' .'-  .
 '.'..--  :. '- :itzzy1'.''' 'Tyyzysssfyysssszysyyfssfy~. -:?zfszy1r--.' -' ''
'.-. '-'*1t\~.'-' ,ist1 -' .'-1ztzzszsyfysttzsfsyyfyzty<.' ''_(sftfsY*--' -  '
 '....-itftst|^'' -'~vY...--' Ttzsytzfztyfszffffzsytstzzi^- '-.,)ysfsyi. --.' 
'.-.  -'"1tsyss/~--''-_  -. ' Yzzttyffstfyffsfzyfzsfstyfstv~'''- !\yY*. '' .- 
-'.' '''--=Tfysys?! ' ' ' .''.Tysszsftstsyzftyzzzyzysftzzszsi^ - .-: -. ''.'. 
-'.'. .-.' ."Ttfsfs(:- ..-' -.Yyyfssysyyfzstfzsstzzsszy;Lyttssv: ''.'''  .. .'
 ' -'-''' '--.;Ytzzff|_' .' '-Yytztzyzfzytfzztstttytyzf_ >{ttyY; -. '. '  -  .
-.' .''-'   '  .=1zttz1' .-'-   .  ' .-'---...'.  '--.-.'  +ir .' '''.. '--.. 
 -'..-' ' '''.'-'.;Tzf1 .' .. -.' '  '  -.- . ' ..'>xT)'''''  -- '.-   '  ''  
. '' -  '-' '-' ' '.;1T . ' '.' -.  --  -'-'' '. 'vsffsY>'' .-. - .'-.  -''-' 
- --''--.'' .' '- . -'+<??|/|=^..'  .~(|)\||+. '   *Ty1='- '.  '.  -'-- .''' '
....'''.   . .   '''''. *1fftft?,. -'-~vzzfzt[>' .'..>.'''-  -- ' ' .' '      
  -'-' ..'--- .'-'. .' ' ';Ytttzz/:'' .'~vzyzssL<-- .' ' - - .''. '  - '   -- 
'  -' -''.  '  -.-'..'- '-  "Tsfzfy\~  - -!ifsszY^'   ' ' -- .   '''   .'''-' 
 ' '.' ..''- ''-   - '''--'- .;Tftsss|_'  '.:iL=-''- .-'-..'..   ..- ' ' .'''-
. .  -. ' -'' '.'''.   - '-'  ..rYttzft?:'  - ' . .. -.'-   '' --- -  '  --'- 
''-'.- .'. --'''.'.     '''--.-.  rYfyyyf?~'    ...' - '  ....  .  '..'''' -' 
 -'''. .-   -'--.   - '' -'-''-   . ;Tyt1=.... . -  '''' - ' -.  '' .''-  ' '.
 '-  . '--'..   -- .'-'- '  '.  - '-.'"=' -'' '-    ' '   -''-.   - -- '     '
 .'-   ' -- -- -' ..   '  '-.''''-'. ' '   ' - -''-''' ' ''''' .     '.- '-.-.
'. . .'  '.''.'..-..''---'  .  ''.--.   ' -' .'.-''-''  https://raycast.com ''
  -.- ---' ''  ..'-.'  '- '-.'  '--''-.. ''-    '  . ''' .'. -'.'-  .'- ''.'.                                                                     
      `);
      setLogged(true);
    }
  }, [logged, isClient, isDev]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return <></>;
}
